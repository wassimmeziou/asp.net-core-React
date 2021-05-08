import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextImput";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../Errors/validationErrors";
export default observer(function RegisterForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
            .matches(
                // /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
                "Password must contain at least 4 up to 8 characters, one uppercase, one lowercare and one number"
            )
        // confirmPassword: Yup
        //   .string()
        //   .required("Please confirm your password")
        //   .oneOf([Yup.ref('password'), null], "Passwords don't match.")
    });


    return (
        <Formik
            initialValues={{ displayName: '', userName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors, dirty, isValid }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign="center" />

                    <MyTextInput name="displayName" placeholder="DisplayName" />
                    <MyTextInput name="userName" placeholder="UserName" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name='error'
                        render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}

        </Formik>
    )
});