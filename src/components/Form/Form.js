import { useState } from "react";
import { isValidName, isValidFrenchPostalCode, areAllFieldsFilled, validateAge, isValidEmail } from './form_checker';
import SuccessToast from '../Toast/SuccessToast';

export default function Form() {
    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        date: '',
        city: '',
        postal: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [isButtonAvailable, setButtonAvailable] = useState(false)
    const [errors, setErrors] = useState({});
    const [isSuccessful, setSuccessful] = useState(false);

    function search(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        let newErrors = {};

        if (!isValidName(formData.get('first_name'))) {
            newErrors["first_name"] = "Please verify your first name";
        }
        if (!isValidName(formData.get('last_name'))) {
            newErrors["last_name"] = "Please verify your last name";
        }
        if (!isValidEmail(formData.get('email'))) {
            newErrors["email"] = "Please verify your email";
        }
        if (!isValidName(formData.get('city'))) {
            newErrors["city"] = "Please verify your city";
        }
        if (validateAge(formData.get('date')) < 18) {
            newErrors["date"] = "Please verify the birthday date";
        }
        if (!isValidFrenchPostalCode(formData.get("postal"))) {
            newErrors["postal"] = "Please verify your postal code";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSuccessful(true);
            setFormData(initialState);

            setTimeout(() => {
                setSuccessful(false);
            }, 5000)
        }
    }

    function manage_button_state(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        setButtonAvailable(areAllFieldsFilled(formData));
    }

    return (
        <div className={"flex w-full m-auto justify-center"}>
            <div className={ "bg-gray-100 w-3/4 px-4 py-2 my-8 rounded-lg text-black" }>
                <h1 className={ "text-6xl mb-8" }>Register 2</h1>
                <form onSubmit={ search }>
                    <div className={ "flex flex-row justify-center" }>
                        <div className={ 'my-4 mr-4 w-full' }>
                            <label className={ 'form_label' } htmlFor={ 'first_name' }>First name:</label>
                            <input className={ 'form_input' } type={ 'text' } name="first_name" placeholder={ 'Max' }
                                   onChange={ manage_button_state } value={ formData.first_name }/>
                            { errors.first_name && <div className={ 'alert' }>* Please verify your first name</div> }
                        </div>
                        <div className={ 'my-4 ml-4 w-full' }>
                            <label className={ 'form_label' } htmlFor={ 'last_name' }>Last name:</label>
                            <input className={ 'form_input' } type={ 'text' } name="last_name" placeholder={ 'Smith' }
                                   onChange={ manage_button_state } value={ formData.last_name }/>
                            { errors.last_name && <div className={ 'alert' }>* Please verify your last name</div> }
                        </div>
                    </div>
                    <div className={ 'my-4 block' }>
                        <label className={ 'form_label' } htmlFor={ 'email' }>Mail:</label>
                        <input className={ 'form_input' } type={ 'email' } name="email" placeholder={ 'mail@mail.com' }
                               onChange={ manage_button_state } value={ formData.email }/>
                        { errors.email && <div className={ 'alert' }>* Please verify your mail</div> }
                    </div>
                    <div className={ 'my-4' }>
                        <label className={ 'form_label' } htmlFor={ 'date' }>Birthday:</label>
                        <input className={ 'form_input' } type={ 'date' } name="date" onChange={ manage_button_state }
                               value={ formData.date }/>
                        { errors.date && <div className={ 'alert' }>* Please verify your date</div> }
                    </div>
                    <div className={ 'my-4' }>
                        <label className={ "form_label" } htmlFor={ "city" }>City:</label>
                        <input className={ "form_input" } type={ "text" } name="city" placeholder={ "Montpellier" }
                               onChange={ manage_button_state } value={ formData.city }/>
                        { errors.city && <div className={ "alert" }>* Please verify your city</div> }
                    </div>
                    <div className={ "my-4" }>
                        <label className={ "form_label" } htmlFor={ "postal" }>Postal code:</label>
                        <input className={ "form_input" } type={ "text" } name="postal" placeholder={ "34500" }
                               onChange={ manage_button_state } value={ formData.postal }/>
                        { errors.postal && <div className={ "alert" }>* Please verify your postal code</div> }
                    </div>

                    <button disabled={ !isButtonAvailable }
                            className={ "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500" }
                            type="submit">Register
                    </button>
                </form>
            </div>
            {isSuccessful && <SuccessToast setSuccessful={setSuccessful}/>}
        </div>
    )
}
