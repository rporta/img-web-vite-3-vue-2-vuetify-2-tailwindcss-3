<template>
    <v-card>
        <v-card-text class="!tw-p-0">
            <v-tabs fixed-tabs v-model="activeTab">
                <v-tab key="calendar">
                    <slot name="dateIcon">
                        <t-icon class="!tw-text-[18px] tw-text-[#6b7280]">ic:sharp-event</t-icon>
                    </slot>
                </v-tab>
                <v-tab key="timer" :disabled="dateSelected">
                    <slot name="timeIcon">
                        <t-icon class="!tw-text-[18px] tw-text-[#6b7280]">ic:baseline-access-time</t-icon>
                    </slot>
                </v-tab>
                    <v-tab-item key="calendar">
                        <v-date-picker
                            class="tw-border-none"
                            v-model="date"
                            v-bind="datePickerProps"
                            full-width
                            />
                    </v-tab-item>
                    <v-tab-item key="timer">
                        <v-time-picker
                            ref="timer"
                            class="v-time-picker-custom tw-border-none"
                            v-model="time"
                            v-bind="timePickerProps"
                            full-width
                            />
                    </v-tab-item>
            </v-tabs>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="actions" :parent="this">
                <v-btn color="grey lighten-1" text @click.native="clearHandler">{{ _clearText }}</v-btn>
                <v-btn color="green darken-1" text @click="okHandler">{{ _okText }}</v-btn>
            </slot>
        </v-card-actions>
    </v-card>
</template>

<script>
import { format, parse } from 'date-fns';

const DEFAULT_DATE = '';
const DEFAULT_TIME = '00:00:00';
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
const DEFAULT_DIALOG_WIDTH = 340;

export default {
    name: 'datetimepicker-ui',
    model: {
        prop: 'datetime',
        event: 'input',
    },
    props: {
        datetime: {
            type: [Date, String],
            default: null
        },
        disabled: {
            type: Boolean,
        },
        dateFormat: {
            type: String,
            default: DEFAULT_DATE_FORMAT,
        },
        timeFormat: {
            type: String,
            default: 'HH:mm'
        },
        clearText: {
            type: String,
        },
        okText: {
            type: String,
        },
        textFieldProps: {
            type: Object,
        },
        datePickerProps: {
            type: Object,
        },
        timePickerProps: {
            type: Object,
        },
    },
    data() {
      return {
            display: false,
            activeTab: 0,
            date: DEFAULT_DATE,
            time: DEFAULT_TIME,
        }
    },
    mounted() {
        this.init()
    },
    computed: {
        dateTimeFormat() {
            return this.dateFormat + ' ' + this.timeFormat
        },
        defaultDateTimeFormat() {
            return DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT
        },
        formattedDatetime() {
            return this.selectedDatetime ? format(this.selectedDatetime, this.dateTimeFormat) : ''
        },
        selectedDatetime() {
            if (this.date && this.time) {
                let datetimeString = this.date + ' ' + this.time
                if (this.time.length === 5) {
                    datetimeString += ':00'
                }

                return parse(datetimeString, this.defaultDateTimeFormat, new Date())
            } else {
                return null
            }
        },
        dateSelected() {
            return !this.date
        },
        _clearText () {

            if (this.clearText?.length> 0) {
                return this.clearText;
            }

            return this.$t('pages.decay.modal.pickerInicial.actions.clear');
        },
        _okText () {

            if (this.okText?.length> 0) {
                return this.okText;
            }

            return this.$t('pages.decay.modal.pickerInicial.actions.closed');
        },
    },
    methods: {
        init() {
            if (!this.datetime) {
                return
            }

            let initDateTime
            if (this.datetime instanceof Date) {
                initDateTime = this.datetime
            } else if (typeof this.datetime === 'string' || this.datetime instanceof String) {
                // see https://stackoverflow.com/a/9436948
                initDateTime = parse(this.datetime, this.dateTimeFormat, new Date())
            }

            this.date = format(initDateTime, DEFAULT_DATE_FORMAT)
            this.time = format(initDateTime, DEFAULT_TIME_FORMAT)
        },
        okHandler() {
            this.$emit('input', this.selectedDatetime);
            this.$emit('closed');
        },
        clearHandler() {
            this.resetPicker()
            this.date = DEFAULT_DATE
            this.time = DEFAULT_TIME
            this.$emit('input', null)
        },
        resetPicker() {
            this.display = false
            this.activeTab = 0
            if (this.$refs.timer) {
                this.$refs.timer.selectingHour = true
            }
        },
        showTimePicker() {
            this.activeTab = 1
        }
    },
    watch: {
        datetime: function() {
            this.init()
        }
    }
}
</script>
