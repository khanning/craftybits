
window.FIELD_SYMBOLS = {
    ledState: {
        type: 'byte',
        values: { on: 1, off: 0 }
    }
};

window.SYMBOLS = {
    event_whenflagclicked: {
        type: 'hat'
    },
    control_stop: {
        type: 'prim',
        byte: 11
    },
    control_repeat: {
        type: 'prim',
        byte: 13
    },
    control_forever: {
        type: 'prim',
        byte: 14
    },
    control_wait_until: {
        type: 'prim',
        byte: 17
    },
    control_repeat_until: {
        type: 'prim',
        byte: 18
    },
    control_wait: {
        type: 'prim',
        byte: 38
    },
    data_setvariableto: {
        type: 'prim',
        byte: 33
    },
    data_variable: {
        type: 'prim',
        byte: 34
    },
    data_changevariableby: {
        type: 'prim',
        byte: 35
    },
    operator_add: {
        type: 'prim',
        byte: 20
    },
    operator_subtract: {
        type: 'prim',
        byte: 21
    },
    operator_multiply: {
        type: 'prim',
        byte: 22
    },
    operator_divide: {
        type: 'prim',
        byte: 23
    },
    operator_mod: {
        type: 'prim',
        byte: 24
    },
    operator_gt: {
        type: 'prim',
        byte: 27
    },
    operator_lt: {
        type: 'prim',
        byte: 28
    },
    operator_not: {
        type: 'prim',
        byte: 32
    },
    operator_random: {
        type: 'prim',
        byte: 37
    },
    operator_equals: {
        type: 'prim',
        byte: 25
    },
    nrf52node_setLED: {
        type: 'prim',
        byte: 0x41
    },
    nrf52node_changeLED: {
        type: 'prim',
        byte: 0x42
    },
    nrf52node_setBrightness: {
        type: 'prim',
        byte: 0x43
    },
    button_whenPressed_: {
        type: 'hat',
        remote: true
    },
    light_toggleLED_: {
        type: 'prim',
        byte: 0x44
    },
    light_whenStarted: {
        type: 'hat',
        byte: 0x08
    },
    light_setLED: {
        type: 'prim',
        byte: 0x41
    },
    light_setLEDColor: {
        type: 'prim',
        byte: 0x45
    },
    light_changeLEDColor: {
        type: 'prim',
        byte: 0x42
    },
    motor_whenStarted: {
        type: 'hat',
        byte: 0x08
    },
    motor_setMotorOn: {
        type: 'prim',
        byte: 0x41
    },
    motor_setMotorOff: {
        type: 'prim',
        byte: 0x42
    }
};
