export default function Contact() {
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Contact Us</h2>

      <div className="row">
        <div className="col-md-6">
          <p className="text-muted fs-5">
            Have questions or need support? Reach out to us.
          </p>

          <p><b>Email:</b> support@dailydairy.com</p>
          <p><b>Phone:</b> +91 98765 43210</p>
          <p><b>Address:</b> Bengaluru, India</p>
        </div>

        <div className="col-md-6">
          <input className="form-control mb-3" placeholder="Your Name" />
          <input className="form-control mb-3" placeholder="Email Address" />
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Your Message"
          ></textarea>
          <button className="btn btn-primary">Send Message</button>
        </div>
      </div>
    </div>
  );
}
