import React from 'react'
import bg_contact from "../assets/bg_contact.png"

import mail from "../assets/mail.png"
import call from "../assets/call.png"
import location from "../assets/location.png"

// For notifications
import { Toaster, toast } from 'sonner';

const ContactUs = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        toast.info(`Sending...`, {
            position: 'top-center', // Position the toast at the top center
            duration: 2000, // Duration in milliseconds (2000ms = 2 seconds)
        });
        const formData = new FormData(event.target);

        // change the api key (web3forms)
        formData.append("access_key", "your_api_key");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            toast.success(`Email sent successfully`, {
                position: 'top-center',
                duration: 3000,
            });
            event.target.reset();
        } else {
            toast.error(`Failed sending Email`, {
                position: 'top-center',
                duration: 3000,
            });
            console.log("Error", data);
        }

    };

    // --------------------------------------------- RENDERING THE CONTACT-US COMPONENT --------------------------------------------- //
    return (
        <div>
            {/* To display the notifications */}
            <Toaster richColors />

            <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${bg_contact})` }} className='flex items-center justify-around px-[7%] min-h-screen w-full bg-cover bg-center text-white pt-[70px]'>

                {/* Contact Us */}
                <div className='flex flex-col items-start justify-center w-[41%] border-2 shadow-[0_0_10px_white] rounded-3xl min-h-[50vh] px-6 py-4 bg-transparent'>
                    <p className='text-[40px] font-bold my-[5px]'>Contact Us</p>
                    <p className='text-[16px] my-[5px]'>We &#8217;d love to hear from you! Whether you have a question, feedback, or just want to say hello, we are here to help. Drop us a message, and our team will get back to you as soon as possible. Your thoughts and suggestions mean a lot to us!</p>
                    <ul className='flex flex-col my-[5px]'>
                        <li className='flex items-center justify-start p-2 my-1'>
                            <img src={mail} width={35} alt='mail' />
                            <span className='ml-3'>stocksearch@invest.com</span>
                        </li>

                        <li className='flex items-center justify-start p-2 my-1'>
                            <img src={call} width={35} alt='call' />
                            <span className='ml-3'><pre>+91 9988776655</pre></span>
                        </li>
                        <li className='flex items-center justify-start p-2 my-1'>
                            <img src={location} width={45} alt='location' />
                            <span className='ml-[6px]'>Andhra Pradesh , India .</span>
                        </li>
                    </ul>
                </div>

                {/* Form component */}
                <div className='flex flex-col items-start justify-center w-[41%]  min-h-[50vh] border-2 shadow-[0_0_10px_white] rounded-3xl px-6 pt-4 pb-9 bg-transparent'>
                    <p className='text-[40px] font-bold mb-[10px] '>Send us a message </p>

                    <form className='flex flex-col items-start justify-between w-full ' onSubmit={onSubmit}>
                        <label className='text-[18px]'>Your Name</label>
                        <input type='text' name='your_name' placeholder='Enter your name' required className='block py-2 px-3 border-2 rounded-3xl outline-0 mb-[7px] w-full mt-[5px] bg-transparent ' />

                        <label className='text-[18px]'>Email</label>
                        <input type='email' name='email' placeholder='Enter your email' required className='block py-2 px-3 border-2 rounded-3xl outline-0 mb-[7px] mt-[5px] w-full bg-transparent' autoComplete='off' />

                        <label className='text-[18px]'>Phone Number</label>
                        <input type='tel' name='phone' placeholder='Enter your phone number' required className='block py-2 px-3 border-2 rounded-3xl outline-0 mb-[7px] mt-[5px] w-full bg-transparent' autoComplete='off' />

                        <label className='text-[18px]'>Write your message here</label>
                        <textarea name='message' rows={4} placeholder='Enter your message' required className='block py-2 px-3 border-2 rounded-3xl outline-0 mb-[7px] mt-[5px] w-full bg-transparent' />

                        <button type='submit' className='mt-[7px] ml-[15px] bg-[#2687ff] border-[3px] border-[#2687ff] py-[6px] px-4 rounded-3xl hover:bg-white hover:text-[#2687ff] hover:border-[3px] hover:border-[#2687ff] cursor-pointer '><pre className='font-outfit'>Send  mail</pre></button>
                    </form>

                </div>

            </div>
            
        </div>
    )
}

export default ContactUs
