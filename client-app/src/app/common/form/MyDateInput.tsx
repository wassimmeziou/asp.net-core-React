import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Form, Label } from "semantic-ui-react";

export default function MyDateInput(prop: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(prop.name!);

    return (
        <Form.Field error=
            {meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...prop}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}>

            </DatePicker>
            {meta.touched && meta.error ? (
                <Label basic color='red' >{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}