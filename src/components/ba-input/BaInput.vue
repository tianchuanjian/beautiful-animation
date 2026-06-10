<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import {
	formatAmountDisplay,
	normalizeAmountOnBlur,
	sanitizeAmountInput,
	stripThousandSeparators,
	toDisplayValue,
} from "./amount";
import type { InputAlign, InputMode, InputSize, InputStatus } from "./types";

defineOptions({ name: "BaInput" });

const props = withDefaults(
	defineProps<{
		modelValue?: string | number | null;
		mode?: InputMode;
		decimalPlaces?: number;
		useThousandSeparator?: boolean;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		clearable?: boolean;
		label?: string;
		hint?: string;
		prefix?: string;
		suffix?: string;
		status?: InputStatus;
		size?: InputSize;
		align?: InputAlign;
		name?: string;
		id?: string;
		autocomplete?: string;
	}>(),
	{
		modelValue: "",
		mode: "text",
		decimalPlaces: 2,
		useThousandSeparator: false,
		placeholder: "",
		disabled: false,
		readonly: false,
		clearable: false,
		label: "",
		hint: "",
		prefix: "",
		suffix: "",
		status: "default",
		size: "md",
		align: "left",
		name: "",
		id: "",
		autocomplete: "off",
	},
);

const emit = defineEmits<{
	"update:modelValue": [value: string];
	input: [value: string];
	change: [value: string];
	clear: [];
	focus: [event: FocusEvent];
	blur: [event: FocusEvent];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const displayValue = ref("");

function syncFromModel() {
	if (props.mode === "amount") {
		displayValue.value = toDisplayValue(props.modelValue, props.decimalPlaces, props.useThousandSeparator);
		return;
	}

	displayValue.value = props.modelValue == null ? "" : String(props.modelValue);
}

watch(
	() => [props.modelValue, props.mode, props.decimalPlaces, props.useThousandSeparator] as const,
	() => {
		syncFromModel();
	},
	{ immediate: true },
);

const inputClasses = computed(() => [
	"ba-input",
	`ba-input--${props.size}`,
	`ba-input--${props.status}`,
	`ba-input--align-${props.align}`,
	{ "is-focused": isFocused.value, "is-disabled": props.disabled },
]);

const shouldShowClear = computed(
	() => props.clearable && !props.disabled && !props.readonly && isFocused.value && displayValue.value.length > 0,
);

function emitValue(value: string) {
	emit("update:modelValue", value);
	emit("input", value);
}

function handleTextInput(event: Event) {
	const target = event.target as HTMLInputElement;
	displayValue.value = target.value;
	emitValue(target.value);
}

function handleAmountInput(event: Event) {
	const target = event.target as HTMLInputElement;
	const cursor = target.selectionStart ?? target.value.length;
	const valueBeforeCursor = target.value.slice(0, cursor);
	const sanitizedValue = sanitizeAmountInput(target.value, props.decimalPlaces);
	const sanitizedBeforeCursor = sanitizeAmountInput(valueBeforeCursor, props.decimalPlaces);
	const nextDisplayValue = formatAmountDisplay(sanitizedValue, props.useThousandSeparator);
	const nextDisplayCursor = formatAmountDisplay(sanitizedBeforeCursor, props.useThousandSeparator).length;

	displayValue.value = nextDisplayValue;
	emitValue(stripThousandSeparators(sanitizedValue));

	nextTick(() => {
		inputRef.value?.setSelectionRange(nextDisplayCursor, nextDisplayCursor);
	});
}

function handleInput(event: Event) {
	if (props.mode === "amount") {
		handleAmountInput(event);
		return;
	}

	handleTextInput(event);
}

function handleChange() {
	const emittedValue = props.mode === "amount" ? stripThousandSeparators(displayValue.value) : displayValue.value;
	emit("change", emittedValue);
}

function handleFocus(event: FocusEvent) {
	isFocused.value = true;
	emit("focus", event);
}

function handleBlur(event: FocusEvent) {
	isFocused.value = false;

	if (props.mode === "amount") {
		const rawValue = stripThousandSeparators(displayValue.value);
		const normalizedValue = normalizeAmountOnBlur(rawValue, props.decimalPlaces);

		displayValue.value = formatAmountDisplay(normalizedValue, props.useThousandSeparator);

		if (normalizedValue !== rawValue) {
			emitValue(normalizedValue);
			emit("change", normalizedValue);
		}
	}

	emit("blur", event);
}

function clearValue() {
	displayValue.value = "";
	emitValue("");
	emit("clear");

	nextTick(() => {
		inputRef.value?.focus();
	});
}
</script>

<template>
	<label :class="inputClasses">
		<span v-if="label" class="ba-input__label">{{ label }}</span>

		<span class="ba-input__surface">
			<span v-if="prefix || $slots.prefix" class="ba-input__affix ba-input__affix--prefix">
				<slot name="prefix">{{ prefix }}</slot>
			</span>

			<input
				:id="id || undefined"
				ref="inputRef"
				class="ba-input__field"
				:name="name || undefined"
				:value="displayValue"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:autocomplete="autocomplete"
				:inputmode="mode === 'amount' ? 'decimal' : undefined"
				@input="handleInput"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur" />

			<button
				v-if="shouldShowClear"
				type="button"
				class="ba-input__clear"
				aria-label="Clear input"
				@mousedown.prevent
				@click="clearValue">
				&times;
			</button>

			<span v-if="suffix || $slots.suffix" class="ba-input__affix ba-input__affix--suffix">
				<slot name="suffix">{{ suffix }}</slot>
			</span>
		</span>

		<span v-if="hint" class="ba-input__hint">{{ hint }}</span>
	</label>
</template>
