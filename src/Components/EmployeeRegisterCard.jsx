import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { RegisterContainer, RegisterSection as Section, RegisterInput as Input, RegisterSelect as Select } from './EmployeePageStyledComponents';
import { ConfirmModal, Overlay } from './StyledComponents';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterCard = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [privileges, setPrivileges] = useState('user');
    const [showConfirm, setShowConfirm] = useState(false);
    const modalRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Create new employee object
        const newEmployee = {
            firstName,
            lastName,
            email,
            phone,
            password,
            privileges
        };

        // Send POST request to server
        axios
            .post(
                `${import.meta.env.VITE_APP_API_URL}employee/`,
                newEmployee,
                {
                    headers: { 'x-api-key': import.meta.env.VITE_APP_API_KEY },
                }
            )
            .then(response => {
                // Check if the request was successful
                if (response.status === 200) {
                    toast.success('Employee registered successfully');
                } else {
                    toast.error('Employee registration failed');
                }
            })
            .catch(error => {
                console.error('Error registering employee:', error);
                toast.error('An error occurred while registering the employee. Please try again.');
            });
    };
    
    const handleClick = (event) => {
        event.preventDefault();
        setShowConfirm(true);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowConfirm(false);
            }
        }

        // Attach the listeners to the document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <RegisterContainer>
            <form onSubmit={handleClick} >
                <Section>
                    <Input type='text' placeholder="Last Name" value={lastName} autoComplete="asdgqwsdf" onChange={(e) => setLastName(e.target.value)} />

                    <Input type='text' placeholder="First Name" value={firstName} autoComplete="asdgqwsdf" onChange={(e) => setFirstName(e.target.value)} />
                </Section>

                <Section>
                    <Input type='email' placeholder="Email" value={email} autoComplete="asdgqwsdf" onChange={(e) => setEmail(e.target.value)} />

                    <Input type='tel' placeholder="Phone" value={phone} autoComplete="asdgqwsdf" onChange={(e) => setPhone(e.target.value)} />
                </Section>

                <Section>
                    <Input type='password' placeholder="Password" autoComplete="asdgqwsdf" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Input type='password' placeholder="Confirm Password" autoComplete="asdgqwsdf" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Section>

                <Section>
                    <Select value={privileges} onChange={(e) => setPrivileges(e.target.value)}>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </Select>
                </Section>

                <Section>
                    <Input className="submit" type='submit' value='Register' />
                </Section>
            </form>
            {showConfirm &&
                <>
                    <Overlay />
                    <ConfirmModal ref={modalRef}>
                        <form onSubmit={handleSubmit}>
                            <Input type='submit' value='Submit'/>
                        </form>
                    </ConfirmModal>
                </>
            }
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

        </RegisterContainer>
    );
};

