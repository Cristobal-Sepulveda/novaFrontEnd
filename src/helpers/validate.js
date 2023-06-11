function validate(data) {
    
            const validateName = (name) => {
                const regex = new RegExp(/^[0-9,$]*$/);
                return regex.test(name)
            }
            const validateEmail = (email) => {
                const regex = new RegExp(/[A-Z]{2,4}\b/);
                return regex.test(email)
            }

            let errors = {};
            if (!data.name || data.name.length > 10)  errors.name = "No mas de 10 caracteres";
            if (validateName(data.name)) errors.name = "El nombre es requerido y no puede contener numeros";
            if (!data.lastname || data.lastname.length > 10) errors.lastname = "No mas de 10 caracteres";
            if (validateName(data.lastname)) errors.lastname = "El apellido es requerido y no puede contener numeros";
            if (!data.email || data.email.length > 30) errors.email = "El email es requerido";
            if (validateEmail(data.email)) errors.email = "Solo formato de email";
            if (!data.password || data.password.length < 8) errors.password = "La contraseña es requerida y debe tener al menos 8 caracteres";
            // if (!data.rol || data.rol.length > 10) errors.rol = "Rol is required";
            // if (!/.(gif|jpeg|jpg|png)$/i.test(data.image) && data.image !== "") { errors.image = "Must be a image url with format jpg, gif, png!";}
            // if (!data.description || data.description.length < 20) errors.description = "Description must be at least 20 characters!";
            return errors;
        }
        
    export default validate;