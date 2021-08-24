import { Input } from 'antd';
import styles from './EditProfileDataField.module.css';

//* I can pass the 'styles.label' for ex as an argument and the style will be applied
export default function
    EditProfileDataField(title, value, ref, placeholder = null, hint = null, type = "text", fullNameWarning = null) {
    /* const validateFullName = (e, input) => {
        console.log(input.state.value);
    } */

    const focusInput = (e) => {
        //* if the input box was clicked, it would get focused by default, there's no need for me to repeat actions unnecessarily
        if (e.target.tagName !== 'INPUT') {
            const input = ref.current;

            if (input !== null) input.focus();
            else console.log('%cYou stupid little prick, you shall NOT mess with the Browser\'s Inspector if you want my fricking website to function correctly for you to be able to use it the way I intended it to be used!%c Now refresh the stupid page and stop trying to be cool, because you never will be :)', 'color: red; font-size: 7em; font-weight: 900', 'color: cyan; font-size: 5em; font-weight: 900');
        }
    };

    return (
        <div
            className={styles.fieldWrap}
            /* onClick={(e) => {
                focusInput(e);
                if (title === 'Full name') validateFullName(e, ref.current);
            }} */
            onClick={focusInput}
        >
            <h4 className={styles.label}>{title}</h4>
            <Input
                className={styles.input} ref={ref}
                size="large" bordered={true} type={type}
                placeholder={placeholder || title} defaultValue={value}
            />

            {fullNameWarning !== null ? <p>{fullNameWarning}</p> : ''}

            {hint !== null ? <p className={styles.graySmall}>{hint}</p> : ""} {/*//*  the hint should be html and not just a string */}
            {/* {if(fullName)} => //TODO red information circle + Unfortunately, you can’t leave this blank. */}
        </div>
    )
};
    /* Full name
Display name
What I do
Phone number
Time zone */