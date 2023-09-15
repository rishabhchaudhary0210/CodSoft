import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './Stylesheet/userInfoForm.css';

export const UserInfoForm = () => {
    var currDate = new Date().toISOString().split('T')[0];
    return (
        <div className='user-form-subdiv'>
            <div className='form-duo-inputs'>
                <div className='label-input-container'>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Tony"
                        required
                    />
                </div>
                <div className='label-input-container'>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Stark"
                        required
                    />
                </div>
            </div>
            <div className='form-duo-inputs'>
                <div className='label-input-container'>
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                    >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <div className='label-input-container'>
                    <label htmlFor="dateofBirth">DOB</label>
                    <input
                        type="date"
                        id="dateofBirth"
                        name="dateofBirth"
                        max={currDate}
                        required
                    />
                </div>
            </div>
            <div className='label-input-container'>
                <label htmlFor="emailid">Email-id</label>
                <input
                    type="email"
                    id="emailid"
                    placeholder="abc@example.com"
                    name="emailid"
                    required
                />
            </div>
            <div className='label-input-container'>
                <label htmlFor="phone">Contact No</label>
                <PhoneInput
                    
                    country={'in'}
                    placeholder={"Enter Your Contact No"}
                    inputProps={{ name: 'phone', id:"phone", required:true }}
                    onChange={(e) => console.log(e)}
                />
            </div>

        </div>
    )
}