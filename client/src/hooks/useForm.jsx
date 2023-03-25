import { useState } from "react";
import Input from "../components/form/Input";

export const useForm = (config) => {

    const initialData = {};
    for (const input of config) {
        initialData[input.name] = '';
    };

    const [data, setData] = useState(initialData);

    const onChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const Inputs = config.map(input => <Input key={input.name} name={input.name} type={input.type} label={input.label} placeholder={input.placeholder} options={input.options} value={data[input.name]} onChange={onChange}></Input>);

    return [data, Inputs];
}