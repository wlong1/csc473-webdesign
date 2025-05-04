import { useState, useEffect } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        document.title = "Fastest Food - Contact";
    }, []);

    return (
        <main className="content">
        <section className="contact">
            <h2>Contact Us</h2>

            <p><strong>Google Maps:</strong></p>
            <p>
            <a
                href="https://www.google.com/maps/place/The+City+College+of+New+York/@40.7933722,-73.9592972,14.87z/data=!3m1!5s0x89c2f66fa8896e67:0x84942178a8ed063!4m6!3m5!1s0x89c2f6657fa896f5:0xa785a9c0ac09561a!8m2!3d40.8200471!4d-73.9492724!16zL20vMDIzMDE?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
            >
                Click here to view on Google Maps
            </a>
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="message">Message:</label>
            <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
            ></textarea>

            <button type="submit">Submit</button>
            </form>
        </section>
        </main>
    );
}
