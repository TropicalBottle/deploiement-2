import {calculateAge, calculateAgeStatic, isValidFrenchPostalCode} from "../../module";

export default function Form() {

    function search(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        if (!formData.get("first_name") || !formData.get("last_name") || !formData.get("mail")) {
            alert("Please verify first name or last name");
        }
        if (calculateAgeStatic(formData.get('date')) < 18) {
            alert("You are not of age");
        }
        if (!isValidFrenchPostalCode(formData.get("postal"))) {
            alert("Please enter a french postal code");
        }
        alert("Everything is going fine");
    }

    return (
        <div className={"bg-cyan-700 px-4 py-2 rounded"}>
            <h1 className={"text-6xl mb-8"}>Register</h1>
            <form onSubmit={search}>
                <div className={"my-4"}>
                    <label htmlFor={"first_name"}>First name:</label>
                    <input className={"text-black"} type={"text"} name="first_name" placeholder={"Max"}/>
                </div>
                <div className={"my-4"}>
                    <label htmlFor={"last_name"}>Last name:</label>
                    <input className={"text-black"} type={"text"} name="last_name" placeholder={"Smith"}/>
                </div>
                <div className={"my-4"}>
                    <label htmlFor={"mail"}>Mail:</label>
                    <input className={"text-black"} type={"email"} name="mail" placeholder={"mail@mail.com"}/>
                </div>
                <div className={"my-4"}>
                    <label htmlFor={"date"}>Birthday:</label>
                    <input className={"text-black"} type={"date"} name="date"/>
                </div>
                <div className={"my-4"}>
                    <label htmlFor={"city"}>City:</label>
                    <input className={"text-black"} type={"text"} name="city" placeholder={"Montpellier"}/>
                </div>
                <div className={"my-4"}>
                    <label htmlFor={"postal"}>Postal code:</label>
                    <input className={"text-black"} type={"text"} name="postal" placeholder={"34500"}/>
                </div>

                <button disabled className={"bg-green-500 mt-8 px-4 rounded disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"} type="submit">Submit</button>
            </form>
        </div>
    )
}
