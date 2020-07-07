const LIGHT_ICON = 'data:image/png;base64,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';
const LIGHT_BLOCKS = (s_id, id) => {
    return [
        {
            opcode: 'whenStarted',
            blockType: 'hat',
            text: 'when started'
        },
        {
            opcode: 'toggleLED_' + id,
            blockType: "command",
            text: `toggle light${s_id}`
        },
        {
            opcode: 'setLED_' + id,
            blockType: "command",
            text: `set light${s_id} [state]`,
            arguments: {
                state: {
                    type: "string",
                    menu: "ledState",
                    defaultValue: "on"
                }
            }
        },
        {
            opcode: 'setLEDColor_' + id,
            blockType: 'command',
            text: `set light${s_id} color to [NUM]`,
            arguments: {
                NUM: {
                    type: 'number',
                    defaultValue: '20'
                }
            }
        },
        {
            opcode: 'changeLEDColor_' + id,
            blockType: 'command',
            text: `change light${s_id} color by [NUM]`,
            arguments: {
                NUM: {
                    type: 'number',
                    defaultValue: '10'
                }
            }
        }
    ];
};
const LIGHT_MENUS = {ledState: [{text: "on"}, {text: "off"}]};

const BUTTON_ICON = 'data:image/png;base64,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';
const BUTTON_BLOCKS = (s_id, id) => {
    return [
        {
            opcode: 'whenPressed_' + id,
            blockType: "hat",
            text: `when button${s_id} pressed`
        },
        {
            opcode: 'isPressed' + id,
            blockType: "Boolean",
            text: `button${s_id} pressed?`
        }
    ];
};

const MOTOR_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAON0lEQVR42u1dCVRVxxl+ssmiBSK4JQpqTBq3LGrd0iYqioI1VlsVQUWNxq3GJK3t6al64o4CJrhLtD0xcY+IK+6KSlYVlZi4K2gCbmjdqs050/mub+6dmXfvW+DdJyhzzn/O8y4z83/MzP/P/39ztVjKXvGjMpxKDpU7VsHvd6z3KoqdUo/KYSrEQA5RiayASb8AmAI74DHJp1K3Ai7baSuMvP4J8eSrnAPky4P7SXy/OL2R6FsBm1be5wGanZJMHt6/K0jKrJkyiO9VwPaohFMpZsAMG/q2DXhMhgwexANYbH33qS+pDJTq4eHkxtUiQwCvFRWS8LAwHsTUpx28QCo37E1dB1P5hrWOp65UpRJHZRsDo2rVKqT42hWHAGKEBgUF8SBupzKESo0nHTQvKr2oZFC5L7snAwf0dwgek4T4fnruzS9UNlPpScXnSQIOyiRQOWHPv9uyaaPTAG5Yn+HIVzxHZQQV//IOXm8qp/WUrByoTUNfX1+npi+T61eKiI+Pj1ZXUBUjIM9T+WN5BA7r0TpZIS+q9Kuxb5E/r9xA+s2co15v3aqV0+Ax+U3Llur78bPmkjGrNpJXu/Ug3vSPoQPkqvIEHozDNQE4b2/Srl8imZF7jiy6+lCRqOHvqvfHjB7tMoCjR41U30ddrN4ZR8+TdvGDlDYlEEPLg5FIlf/6jTtEk4nZR1QFmTTp2EV9Ju2j2S4D+FFqivo+6pLrn7g/lzSLjlVG5GuxPW6lFz1oVpbBw2K9Rljj6LqUkLrARjEmYXUjS2RAmGzakKm+j7qM2lnw8z32+x6Vt8sieM9QOcCDF/FKczL56xO6Co3bso806xxLKlWqpD7/Q94xlwH8/liu+j7qQp1/25JtCCST+YX30ry8vD6g702lElwWRt5+HjwoMif/pk3HJ32ZRxq376xrLS8XXHQZwIKL53XrwpJh9MeDDE3/nH9+yuNe81bzncfizU0ZdQp1+8s/iY+fn6HfdvP6VZcBhNtjVJ+PX2Xy+3HjyYLC+zYAjly2TjNuXl7/eJwApsjgLbzyQOgsLOLzrdrZKNigUWNeCfLg3h2XAcQ7eFevTiYvtP0dSTp+URfExDlLyLxLt+c9LvD6ytNWHnnj9x0iwTVqCQrVjogks9dmknVHf1CveVN3o6QAenOuSsaxH0nq6gxSq26E0GZIrdq6XgAnHjcscJKv8gZDXvPGbd5LAoNDBEV6JA4h2UU3yXd3fyGbT4rrl70Qlr3diLAVPHVBqTu7qJjE9usv3AsMCVWMlwGA9xdfefgKfS7EUwB+wbsq8oKNkceD50P9sPHzFyvKMdmZXygoeOHsaZcBPH/mlFDHroIioY3Rk6YKlh4gTsg+rAviy1263fLUjuVPfKdlPw9rHj9t/QMDSVrGJkExyNe3/ivsFI4dOewygLmHvtOWAbpF/OY/D2zaSfpsFakcEKBN55q1SNKxC0Kf512+LQBt5t7Zm8op3l2QrW3D1q8LI08PPCZhNTWg9+za4TKAu3ZsU98Pp+ucUTsAkTc2MCyydcYaLkVyKpsBYAK/t5UXZrgq/OicsCDdUClIo+Yt1GfnzUlzGcC5aR9rvl+LlnbbGvXhFKFvcHGEbR/VRdo7DzfD51PjeW3jBto4ybyfB4NhTyEIv9APf2eYywC+M2yoBkjCQIftxcQlCH6ivHYj2CGNQrcGZXup6w2dmnxUBcLvMOCqMGtrT8ZMma6+07ZNGwWU47lHyORJH5KuXaJJvXr1SEhwsCL4HdO1i3Iv72iu8izeYe+PnT7TYXuwzjXr1DUMQEAnLy7GaI1su61ksIoRz5P3tkJOl/p5jpSBLMraRfh8SKeojo6izOq+t3OnKOUddm3xtj1OtQk/ka9L3jtDN+7+JncmgNQcBoKhRgvwC02bkcy8U2TDiTNk9+WrupaRSc71O8TP398p0OwJ6si5cdewHfQBfUGf0LeGTZpqG4DoWEEX6CblWNySqIrjw/CIJCOACSuMMJLkAogRaGr9YG1hMLDmYdpi5AE8TKnqzz5n806j+i+QvyaOIitnLiZ7lmQogt+4hnvy86gDdaHOhVt3Km1gvWv0WnOlbd4C641m6ABdokaMVSLbUnpgsDvytttKO0r0Rk312s8K116q15CsTVlKbuWctStrUpaQX9d7XgSR1uWO0awjO0qadw63RpeLTeiUjfSK6kYK93zvEDwmeLZnVCzxRN+sGKQ6SyMBS+p9I+CQPWvTurWSw5jz8UdKJBmBzZ8vFwhZNexTsT3DDgNOMvw8uCqwnPziz8C7efCMDUgF23PJvqWZiuC3fB/v/KGjCCLqbte2rdLW/LlzyN7dO5U+oC/oEx8K++lSvtJ36ICUAnSCbr76SSkGJAhNhqywSIsOuRGdQtIbDbmSejQS3tpi2sojL+fTzaRLuw7Eh3Ns8RvXcpZtEUfi7jxhOsM6l7Z/0HHzxg1kQP8Emz+2RaPW2fATwQwVyI0g+oCr4g7QmMDP442OvOYtmzaf+FMn12g64d5n0xcI76yalS4YBYwqd/UXugMDYGGxJXlG8tNWGHmgmJUkxORI4Ajz1lYeeTJ4AfTfAfK1yv7kq8+zhHcxktn9qVMmu73fmP5vDxlsSPIcbnFAbnSXYIfB2oFbwoMQ3ba9ei806FckfdBEciE5i5xP3koWJ05QrrH7Mb+NEt79YKCWI46N6Wpa/1OTZ8kggviuMOBVWq1ZjUMiIrRoMXw7BkD+9iPCmgfwClK3C7IocbxmzOiW69KOo+r7y5MWqfew7TNTB4lufBAA3mYXwEk2s/HgYG0U7V26XgUAv/lpi1EnA4jRGOin+XrZ/9qgvg9nW4350b2zmTrkHMjmAbwtAAhC9+MAEK6KIwBxzd9XWw/3/3tjmQHwoErSocPTzMYjIzU2wgo67Xifz5eLhGDNkwFcONC5KVy/fn1TdYjr24cHEIQCZSFUL4JCa1bjCEkZGRH4ebwRwZqHUQcBeCGBVTVDYc+IxMaY1v/kWUmyERnK3JhD/A2w4UHo9qgbQ51kuCglcWN4Z9oMNwZYDEocKIP3Lb8ribQ6h1qeISxMGY3u9AcRDOUd6dXJnwhAfD5joQ2IMnjLuakPgTXnHekTx4+6rb/QHRiEVasm9+UilQh5N1JXHokQELrBSQat1h1gYrvF6sbIkbdyGF3w8/g1Eb8xbeWRh63ci5Ha6Ivu3MktTnNmxjrFHkhkdn7k1THaD/taN8y6wQTQasEMBbnx49mpCsUMo+pS/gUBXHQCeVukHnfv3K4kgLC70QsmIKqiF0yAkYCrAuENhqNgAtpAvgQBDLR99PAhpS98MAF9RZ/Rd+gAruGokSMU3XzEsL4cTBhrcfKIWZgnw1kAEaPJ6XAWfVYGzwPhrLCSBlSzPBFQxVREYMAReFjz+GlrckA1y+KGgzwlD+nT7RmS3sjbIvX47rQkkr59r5LDMArpY12EWwI/EQ7y7k/WKb9xTY5EyyF9JJfQBtpCm2hbhyutH9KnOkE3/vSAlUTllqTSPcOkUrRtUgnkISWpdPuhZ5JKtC7DpBLtA/qy6cdzjpNKKzL5uqFzFXdl5tQjC6/EdBcaRWqQVyh1zXqnUoxIAPGLP6yzvdFsN62ZtdupNpNXfiGmNbful0lG/P217swL9+TPekw/clZMrHfQwlTg52FKuZJYRxie8Z6nTJ6khKQaNGigJtbxGzsMOMnMz+MT65i2jtrbV3iD1HiujpZYj+oq6DDt8Gk5sf6WedSOvgOExkGT8OF2DEhhukK1KC21o1v8ALttfXvnf6RrH+18nS91yCd/84OgQ+ve8Tx4x606u7XE88ZB5tqBsMNPD/Dz7JKLXmuuPosEUGnIRcg722tr5MRJQt+6/32iyGnc+x2pJOaP+1pMKCK9rX1nkd5WeF+hjvFJdVDLzKK3wUl2ht42/dMVwtr64utvCvQ28LpfekOglfxo1dV8gmV88jwBRBC6wUlW3Z6AAF0QPUWwnLFspWDpQ6m/ODNPJJ3HJaXJhqqnxeSylvcLJ331vQ3XDnRa3mqCn+dpii+mLT/ygkKfUY5/8X39MOc48QsI9PihxOo8ybxus1dJ2sViG9eGB1FJBFGjwayzmSRzWFveYDDwZJcl7cINUqfJy/xzVywe/IhFH76DTTvF2BxzgJEJqSkecwA/L2XVOtOOOcDP410VNm3lkTf/p7vCYUezudFGJVk4aNMv0eagDQjdvGHx9EEbGAx5zUMfwbCVnp1ZNo56URBtjnpRiwcXx8cO48DdR73g58FVkcnk6JsOeKvM8PlKfNgQHr68JjJnW2faKILYnLsOG2I5kZ1ktubptL/fUga+qxAqgwjDAuK53qEWGBhs4t1+3JXWKRsK3tpKBoOBV2ZOseNcxXJhGvkHkN5TU2zWRSbV6kSU6sD1xsz1Th24HjR3qRyiYoGCAEsZK16yYVEobG9GKce/PH3kH9szaYfBZNbjXPOcKb2tPpU2xai1bNO3P5l2+IzpH51AVAWBgUq23Ogr1p1UuSjhsoVmQGJUDFuyQthCleSzJy1btBC2lGPXbiXNu/eSQ1JMVlvK6ZfecEDnpMXsD+8EBhm5NCetfSjXxduaV8mzF2kGrdZZAJG3dRC5Pm5t09vyBBUs3D0sj84b37OU4uNjOp8EZTmMtdZIspflCS9VrEHLLEvpP3+XZa2riuUpLMIHGEGhdZEh9dR+gJEvwidAeQqGHktKIvo89Z8AZS6PSiEBG94IQIliVlxSusWTWN4Tcss6U1mH3Di2AjatgPEkUOtgacFHhki0WhtyY0V5VEBYzLc4pnOA3FinAi79EmnRIXlKIy+yAibH03mY5dHpAfbfYYANP7QsTtv/AxFDJ8py6YJhAAAAAElFTkSuQmCC';
const MOTOR_BLOCKS = (s_id, id) => {
    return [
        {
            opcode: 'whenStarted',
            blockType: 'hat',
            text: 'when started'
        },
        {
            opcode: 'setMotorOn_' + id,
            blockType: 'command',
            text: `set motor${s_id} on`
        },
        {
            opcode: 'setMotorOff_' + id,
            blockType: 'command',
            text: `set motor${s_id} off`
        }
    ];
};


const EXTENSION_SPEC = {
    light: {
        iconURI: LIGHT_ICON,
        blocks: LIGHT_BLOCKS,
        menus: LIGHT_MENUS
    }
};
