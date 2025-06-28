import React from 'react'

const Contact = () => {
  return (
    <div>
      <div >
  <h1>FormSubmit Demo</h1>
  <form target="_blank" action="https://formsubmit.co/abhaysinghal696@gmail.com" method="POST">
    <div >
      <div >
        <div >
          <input type="text" name="name" placeholder="Full Name" required/>
        </div>
        <div >
          <input type="email" name="email"  placeholder="Email Address" required/>
        </div>
      </div>
    </div>
    <div >
      <textarea placeholder="Your Message"  name="message" required></textarea>
    </div>
    <button type="submit">Submit Form</button>
  </form>
</div>
    </div>
  )
}

export default Contact
