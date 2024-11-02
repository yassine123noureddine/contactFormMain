import { useState } from 'react';

import './App.css';

function App() {
// useState
const [formValues, setFormValues] = useState({ 
  firstname: '', 
  lastname: '', 
  AddressEamil: '',
  typeG : '',
  messageText : '',
  checkbox : false,

 });
 const [formErrors, setFormErrors] = useState({});
 const [isSubmitted, setIsSubmitted] = useState(false);

  // Define regex patterns for each field
  const regexPatterns = {
    firstname: /^[a-zA-Z]{2,}$/,             // At least 2 alphabetic characters
    lastname: /^[a-zA-Z]{2,}$/,              // At least 2 alphabetic characters
    AddressEmail: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,  // Basic email pattern
    typeG: /^(Support|General)$/,       // Example: accepts "support", "sales", "general"
    messageText: /^.{10,}$/,                  // At least 10 characters
    checkbox: /^true$/                // Ensures checkbox is checked
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormValues({ ...formValues, [name]: fieldValue });

    // Check if the regex pattern exists for the field
    if (regexPatterns[name]) {
        setFormErrors({
            ...formErrors,
            [name]: regexPatterns[name].test(fieldValue.toString()) ? '' : `Invalid ${name}`
        });
    } else {
        // If no regex pattern, reset the error for this field
        setFormErrors({
            ...formErrors,
            [name]: ''
        });
    }
};

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = Object.keys(formValues).reduce((acc, field) => {
      if (!regexPatterns[field].test(formValues[field].toString())) {
        acc[field] = `Invalid ${field}`;
      }
      return acc;
    }, {});
    setFormErrors(errors);
    setIsSubmitted(Object.keys(errors).length === 0);
  };



//  // // // // // // // // // // // // //




  
  return (
    <>
    {isSubmitted && <p>Form submitted successfully!</p>}
    <form onSubmit={handleSubmit}>

    <div className="AllForm">
      {/* first div about input first name and last name */}
        <p className='Contact'>Contact Us</p>
        <div className="First_name_and_last">
            <div>
            <label  htmlFor="">First Name *</label><br />
            <input  type="text" name='firstname' value={formValues.firstname} onChange={handleChange} />
            {formErrors.firstname && <p className='p1'>{formErrors.firstname}</p>}
            
            </div>
            <div>
            <label htmlFor="">Last Name *</label><br />
            <input type="text" name='lastname' value={formValues.lastname} onChange={handleChange}/>
            
            {formErrors.lastname && <p className='p1'>{formErrors.lastname}</p>}
            </div>
        </div>
      {/* first div about Address Email */}
        
        <div className="Address_eamal">
            <div>
            <label className='libleAdress'  htmlFor=""> Email Address *</label><br />
            <input  type="text" name='AddressEamil' value={formValues.AddressEamil} onChange={handleChange}/>
            {formErrors.AddressEamil && <p className='p1'>{formErrors.AddressEamil}</p>}
            
            </div>
        </div>
              {/*  Query Type */}

        <div className="Query_Type">
            <label className='query_t_lable' htmlFor=""> Query Type *</label><br />
        
          <div className='input_radio1'>
          <div className='input_radio2'>
            <input  type="radio" name='typeG'  checked={formValues.typeG === "General"} value="General"  onChange={handleChange}/>
            <label  htmlFor=""> General Enquiry </label>
            </div>
            <div  className='input_radio2'>
            <input type="radio" name='typeG' checked={formValues.typeG === "Support"} value="Support" onChange={handleChange}/>
            <label htmlFor="">Support Request</label>
            </div>
            
          </div>
          {formErrors.typeG && <p className='p1'>{formErrors.typeG}</p>}

        </div>
        {/* div number three about  */}
        
        <div className="mesageText">
            <div>
            <label className=''  htmlFor="">  Message *</label><br />
            <input  type="text" name='messageText' value={formValues.messageText} onChange={handleChange}/>
            {formErrors.messageText && <p className='p1'>{formErrors.messageText}</p>}
            </div>
        </div>

        {/* Contacted */}
        
        <div className="checkbox">
            <div>
            <input  type="checkbox" name='checkbox' value={formValues.checkbox} onChange={handleChange}/>
            <label>  I consent to being contacted by the team</label>
            {formErrors.checkbox && <p className='p1'>{formErrors.checkbox}</p>}
            </div>
        </div>
                  {/* INPUT SUBMIT */}
        
                  <div className="classInput">
            <div>
            <input  type="submit" name='submit' value="submit" />
            </div>
        </div>
        
    </div>
    </form>

    
    </>
  );
}

export default App;
