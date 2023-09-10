import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const UserInfoForm = () => {
    var currDate = new Date().toISOString().split('T')[0];
    return (
        <div>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="Enter First Name" 
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Enter Last Name" 
                    required
                />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select 
                    name="gender" 
                    id="gender"
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="dateofBirth">DOB</label>
                <input 
                    type="date" 
                    id="dateofBirth" 
                    name="dateofBirth" 
                    max={currDate}
                    required
                />
            </div>
            <div>
                <label htmlFor="emailid">Email-id</label>
                <input 
                    type="email" 
                    id="emailid" 
                    placeholder="Enter Your Email-id" 
                    name="emailid" 
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Contact No</label>
                <PhoneInput 
                    id="phone" 
                    country={'in'} 
                    placeholder={"Enter Your Contact No"} 
                    inputProps={{ name: 'phone' }}
                    onChange={(e)=>console.log(e)}
                    required
                />
            </div>

        </div>
    )
}