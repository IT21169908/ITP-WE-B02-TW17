import React from 'react';

const LandingPage = () => {
    return (
        <div>
            {/* <div className="loader">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="spinner">
                            <div className="double-bounce1"/>
                            <div className="double-bounce2"/>
                        </div>
                    </div>
                </div>
            </div>*/}
            <div className="header-area">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-sm-2 col-lg-2">
                            <div className="left">
                                <a href="index.html">
                                    <img
                                        src="assets/images/logo.png"
                                        className="left-logo1"
                                        alt="Logo"
                                    />
                                    <img
                                        src="assets/images/logo-two.png"
                                        className="left-logo2"
                                        alt="Logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-10 col-lg-10">
                            <div className="right">
                                <ul>
                                    <li>
                                        <i className="flaticon-phone-call"/>
                                        <h4>Phone</h4>
                                        <a href="tel:082996576">082-996-576</a>
                                    </li>
                                    <li>
                                        <i className="flaticon-placeholder"/>
                                        <h4>Location</h4>
                                        <a href="#">950 st, Belin Road</a>
                                    </li>
                                    <li>
                                        <i className="flaticon-clock"/>
                                        <h4>Saturday - Tuesday</h4>
                                        <span>09:00 AM - 9:00 PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-area sticky-top">
                <div className="mobile-nav">
                    <a href="index.html" className="logo">
                        <img src="assets/images/logo.png" className="mobile-logo1" alt="Logo"/>
                        <img
                            src="assets/images/logo-two.png"
                            className="mobile-logo2"
                            alt="Logo"
                        />
                    </a>
                </div>
                <div className="main-nav two">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <div
                                className="collapse navbar-collapse mean-menu"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle active">
                                            Home <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="index.html" className="nav-link">
                                                    Home Demo One
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="index-2.html" className="nav-link">
                                                    Home Demo Two
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="index-3.html" className="nav-link active">
                                                    Home Demo Three
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            Pages <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="account.html" className="nav-link">
                                                    Account
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="appointment.html" className="nav-link">
                                                    Appointment
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="pricing.html" className="nav-link">
                                                    Pricing
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="faq.html" className="nav-link">
                                                    FAQ
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="404.html" className="nav-link">
                                                    404 Error Page
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="privacy-policy.html" className="nav-link">
                                                    Privacy Policy
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="terms-conditions.html" className="nav-link">
                                                    Terms &amp; Conditions
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="about.html" className="nav-link">
                                            About Us
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            Doctors <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="doctors.html" className="nav-link">
                                                    Doctors
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="doctor-details.html" className="nav-link">
                                                    Doctor Details
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            Services <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="services.html" className="nav-link">
                                                    Services
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="service-left-sidebar.html" className="nav-link">
                                                    Service Left Sidebar
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="service-right-sidebar.html" className="nav-link">
                                                    Service Right Sidebar
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="service-details.html" className="nav-link">
                                                    Service Details
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            Shop <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="shop.html" className="nav-link">
                                                    Shop
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="cart.html" className="nav-link">
                                                    Cart
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="checkout.html" className="nav-link">
                                                    Checkout
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="wishlist.html" className="nav-link">
                                                    Wishlist
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="shop-details.html" className="nav-link">
                                                    Shop Details
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link dropdown-toggle">
                                            Blog <i className="bx bx-chevron-down"/>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li className="nav-item">
                                                <a href="blog.html" className="nav-link">
                                                    Blog
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="blog-left-sidebar.html" className="nav-link">
                                                    Blog Left Sidebar
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="blog-right-sidebar.html" className="nav-link">
                                                    Blog Right Sidebar
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="blog-details.html" className="nav-link">
                                                    Blog Details
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="contact.html" className="nav-link">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                                <div className="side-nav">
                                    <div className="cart">
                                        <a href="cart.html">
                                            <i className="bx bxs-cart"/>
                                            <span>2</span>
                                        </a>
                                    </div>
                                    <div className="languages">
                                        <select>
                                            <option>English</option>
                                            <option>العربيّة</option>
                                            <option>Deutsch</option>
                                            <option>Português</option>
                                        </select>
                                    </div>
                                    <div className="social">
                                        <ul>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <i className="bx bxl-facebook"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <i className="bx bxl-twitter"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <i className="bx bxl-linkedin"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank">
                                                    <i className="bx bxl-google-plus"/>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="banner-area three">
                <div className="banner-shape">
                    <img src="assets/images/banner/shape1.png" alt="Shape"/>
                    <img src="assets/images/banner/shape2.png" alt="Shape"/>
                    <img src="assets/images/banner/main5.png" alt="Shape"/>
                </div>
                <div className="banner-item">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="banner-content">
                                    <span className="title">Critical Care Center</span>
                                    <h1>We Only Give Best Care To Your Eyes</h1>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                    <a className="common-btn" href="appointment.html">
                                        <span className="one"/>
                                        <span className="two"/>
                                        Get An Appointment
                                    </a>
                                    <a className="common-btn banner-btn" href="about.html">
                                        <span className="one"/>
                                        <span className="two"/>
                                        More About Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="about-area two three pt-100 pb-70">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <div className="about-img-two">
                                <img src="assets/images/about/main3.jpg" alt="About"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-title">
                                    <div className="top">
                                        <span className="top-title">About Us</span>
                                        <span className="sub-title">About Us</span>
                                    </div>
                                    <h2>We Are Caring For Your Eye Health Hospital</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum
                                    </p>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                    ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                                    accumsan lacus vel facilisis
                                </p>
                                <p>
                                    It is a long established fact that a reader will be distracted by
                                    the readable content of a page when looking at its layout. The
                                    point of using Lorem Ipsum is that it has a more-or-less normal
                                    distribution of letters, as opposed to using 'Content here,
                                    content here
                                </p>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available,
                                    but the majority have suffered alteration in some form, by
                                    injected humour, or randomised words which don't look even
                                    slightly believable
                                </p>
                                <ul>
                                    <li>
                                        <a
                                            href="http://www.youtube.com/watch?v=tkhd-JTMwEM&ab"
                                            className="popup-youtube"
                                        >
                                            <i className="bx bx-play"/>
                                        </a>
                                        <span>Watch Video</span>
                                    </li>
                                    <li>
                                        <a className="common-btn" href="appointment.html">
                                            Get An Appointment
                                            <span className="one"/>
                                            <span className="two"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="features-area two pt-100 pb-70">
                <div className="features-shape">
                    <img src="assets/images/features-shape1.png" alt="Shape"/>
                    <img src="assets/images/features-shape2.png" alt="Shape"/>
                </div>
                <div className="container">
                    <div className="section-title">
                        <div className="top">
                            <span className="top-title">Choose Us</span>
                            <span className="sub-title">Why Choose Us</span>
                        </div>
                        <h2>Providing Care For The Sickest</h2>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="features-item">
                                <span>01</span>
                                <i className="flaticon-doctor"/>
                                <h3>
                                    <a href="service-details.html">Qualified Doctors</a>
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <a className="features-btn" href="service-details.html">
                                    View Details
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="features-item">
                                <span>02</span>
                                <i className="flaticon-view"/>
                                <h3>
                                    <a href="service-details.html">Eye Examination</a>
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <a className="features-btn" href="service-details.html">
                                    View Details
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="features-item">
                                <span>03</span>
                                <i className="flaticon-eye-1"/>
                                <h3>
                                    <a href="service-details.html">Contact Lenses</a>
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <a className="features-btn" href="service-details.html">
                                    View Details
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="features-item">
                                <span>04</span>
                                <i className="flaticon-laser"/>
                                <h3>
                                    <a href="service-details.html">Laser Eye Correction</a>
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <a className="features-btn" href="service-details.html">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="doctors-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <div className="top">
                            <span className="top-title">Doctors</span>
                            <span className="sub-title">Doctors</span>
                        </div>
                        <h2>Opnix Eye Care Specialist</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-4">
                            <div className="doctors-item">
                                <div className="top">
                                    <img src="assets/images/doctors/main1.png" alt="Doctor"/>
                                    <ul className="social">
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-twitter"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-linkedin"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <div className="left">
                                        <i className="bx bxs-share-alt button"/>
                                    </div>
                                    <div className="right">
                                        <h3>
                                            <a href="doctor-details.html">Dr. Jolian Acenj</a>
                                        </h3>
                                        <span>Surgery Specialist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="doctors-item">
                                <div className="top">
                                    <img src="assets/images/doctors/main2.png" alt="Doctor"/>
                                    <ul className="social-two">
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-twitter"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-linkedin"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <div className="left">
                                        <i className="bx bxs-share-alt button-two"/>
                                    </div>
                                    <div className="right">
                                        <h3>
                                            <a href="doctor-details.html">Dr. Arnica Sarah</a>
                                        </h3>
                                        <span>Surgery Specialist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="doctors-item">
                                <div className="top">
                                    <img src="assets/images/doctors/main3.png" alt="Doctor"/>
                                    <ul className="social-three">
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-twitter"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" target="_blank">
                                                <i className="bx bxl-linkedin"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <div className="left">
                                        <i className="bx bxs-share-alt button-three"/>
                                    </div>
                                    <div className="right">
                                        <h3>
                                            <a href="doctor-details.html">Dr. Jolian Acenj</a>
                                        </h3>
                                        <span>Lasik Specialist</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services-area three pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <div className="top">
                            <span className="top-title">Services</span>
                            <span className="sub-title">Services</span>
                        </div>
                        <h2>Opnix Eye Care Services</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                            lacus vel facilisis
                        </p>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-4">
                            <div className="services-item">
                                <div className="top">
                                    <a href="service-details.html">
                                        <img src="assets/images/services/main1.jpg" alt="Services"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <i className="flaticon-lasik icon"/>
                                    <h3>
                                        <a href="service-details.html">Retina Repair</a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt
                                    </p>
                                    <a className="services-btn" href="service-details.html">
                                        More Details
                                        <i className="bx bx-plus"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="services-item">
                                <div className="top">
                                    <a href="service-details.html">
                                        <img src="assets/images/services/main2.jpg" alt="Services"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <i className="flaticon-witness icon"/>
                                    <h3>
                                        <a href="service-details.html">Glaucoma &amp; Cornea</a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt
                                    </p>
                                    <a className="services-btn" href="service-details.html">
                                        More Details
                                        <i className="bx bx-plus"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="services-item">
                                <div className="top">
                                    <a href="service-details.html">
                                        <img src="assets/images/services/main3.jpg" alt="Services"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <span/>
                                    <span/>
                                    <span/>
                                    <span/>
                                    <i className="flaticon-eye-1 icon"/>
                                    <h3>
                                        <a href="service-details.html">Dry Eye Surgery</a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt
                                    </p>
                                    <a className="services-btn" href="service-details.html">
                                        More Details
                                        <i className="bx bx-plus"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="counter-area two pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3">
                            <div className="counter-item">
                                <i className="flaticon-doctor"/>
                                <h3>
              <span className="odometer" data-count={1280}>
                00
              </span>
                                    <span className="target">+</span>
                                </h3>
                                <p>Specialized Doctors</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="counter-item">
                                <i className="flaticon-trophy"/>
                                <h3>
              <span className="odometer" data-count={1480}>
                00
              </span>
                                    <span className="target">+</span>
                                </h3>
                                <p>Winning Awards</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="counter-item">
                                <i className="flaticon-satisfied"/>
                                <h3>
              <span className="odometer" data-count={2080}>
                00
              </span>
                                    <span className="target">+</span>
                                </h3>
                                <p>Satisfied Patients</p>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="counter-item">
                                <i className="flaticon-heartbeat"/>
                                <h3>
              <span className="odometer" data-count={1102}>
                00
              </span>
                                    <span className="target">+</span>
                                </h3>
                                <p>Health Sections</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="faq-area ptb-100">
                <div className="container">
                    <div className="faq-img">
                        <img src="assets/images/faq-main.png" alt="FAQ"/>
                    </div>
                    <div className="faq-item">
                        <div className="section-title">
                            <div className="top">
                                <span className="top-title">Questions</span>
                                <span className="sub-title">FAQ</span>
                            </div>
                            <h2>Frequently Asked Questions</h2>
                        </div>
                        <ul className="accordion">
                            <li>
                                <h3 className="faq-head">
                                    <span>01</span> Can lasik get rid of my reading glasses?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>02</span> At what age can you get Lasik?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>03</span> What is a glasses prescription only good for one
                                    year?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>04</span> Do I need to leave my glasses with you if I just
                                    want new lenses?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>05</span> What are the best vision correction options
                                    available for my eyes?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>06</span> Do I need any particular steps to protect my eyes?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h3 className="faq-head">
                                    <span>07</span> Are my digital devices affecting my eyes and so
                                    what I can do?
                                </h3>
                                <div className="faq-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                                        ipsum suspendisse <a href="#">[...]</a>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="pricing-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <div className="top">
                            <span className="top-title">Pricing</span>
                            <span className="sub-title">Pricing Plans</span>
                        </div>
                        <h2>Important With Great Price</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-4">
                            <div className="pricing-item">
                                <span className="title">Premium</span>
                                <i className="flaticon-premium"/>
                                <h3>$55.00</h3>
                                <ul>
                                    <li>Free Equipment Use</li>
                                    <li>2 Days Appointment</li>
                                    <li>24/7 Support</li>
                                    <li>Advanced Options</li>
                                </ul>
                                <a className="common-btn" href="appointment.html">
                                    Get An Appointment
                                    <span className="one"/>
                                    <span className="two"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="pricing-item">
                                <span className="title">Professional</span>
                                <i className="flaticon-professional"/>
                                <h3>$95.00</h3>
                                <ul>
                                    <li>Free Equipment Use</li>
                                    <li>Same Days Appointment</li>
                                    <li>24/7 Support</li>
                                    <li>Advanced Options</li>
                                </ul>
                                <a className="common-btn" href="appointment.html">
                                    Get An Appointment
                                    <span className="one"/>
                                    <span className="two"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="pricing-item">
                                <span className="title">Enterprise</span>
                                <i className="flaticon-professional"/>
                                <h3>$105.00</h3>
                                <ul>
                                    <li>Free Equipment Use</li>
                                    <li>Same Days Appointment</li>
                                    <li>24/7 Support</li>
                                    <li>Advanced Options</li>
                                </ul>
                                <a className="common-btn" href="appointment.html">
                                    Get An Appointment
                                    <span className="one"/>
                                    <span className="two"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-area pb-70">
                <div className="container">
                    <div className="section-title">
                        <div className="top">
                            <span className="top-title">Latest News</span>
                            <span className="sub-title">News &amp; Blog</span>
                        </div>
                        <h2>Opnix Latest News From Our Blog</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="blog-item">
                                <div className="top">
                                    <a href="blog-details.html">
                                        <img src="assets/images/blog/main1.jpg" alt="Blog"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <h3>
                                        <a href="blog-details.html">
                                            Why Do People Get Kidney Stones In The Summer?
                                        </a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor
                                    </p>
                                    <ul>
                                        <li>
                                            <span>February 5, 2021</span>
                                        </li>
                                        <li>
                                            <span>(0) Comments</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="blog-item">
                                <div className="top">
                                    <a href="blog-details.html">
                                        <img src="assets/images/blog/main2.jpg" alt="Blog"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <h3>
                                        <a href="blog-details.html">
                                            How Technology Can Help You To Stay Safe &amp; Healthy?
                                        </a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor
                                    </p>
                                    <ul>
                                        <li>
                                            <span>February 6, 2021</span>
                                        </li>
                                        <li>
                                            <span>(0) Comments</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="blog-item">
                                <div className="top">
                                    <a href="blog-details.html">
                                        <img src="assets/images/blog/main3.jpg" alt="Blog"/>
                                    </a>
                                </div>
                                <div className="bottom">
                                    <h3>
                                        <a href="blog-details.html">
                                            7 Tips For Boosting Immune System &amp; Eye Health
                                        </a>
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor
                                    </p>
                                    <ul>
                                        <li>
                                            <span>February 7, 2021</span>
                                        </li>
                                        <li>
                                            <span>(0) Comments</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer-area pt-100 pb-70">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-item">
                                <div className="footer-contact">
                                    <h3>Contact</h3>
                                    <ul>
                                        <li>
                                            <span>Phone</span>
                                            <a href="tel:882569756">882-569-756</a>
                                        </li>
                                        <li>
                                            <span>Email</span>
                                            <a href="https://templates.hibootstrap.com/cdn-cgi/l/email-protection#eb838e878784ab849b858293c5888486">
                                            <span className="__cf_email__">
                                              admin@visionmate.lk
                                            </span>
                                            </a>
                                        </li>
                                        <li>
                                            <span>Address</span>
                                            <a href="https://www.google.com/maps">
                                                123,westeen Road, Melbourne Australia
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                            <div className="footer-item">
                                <div className="footer-links">
                                    <h3>About</h3>
                                    <ul>
                                        <li>
                                            <a href="doctors.html">Doctors</a>
                                        </li>
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="services.html">Services</a>
                                        </li>
                                        <li>
                                            <a href="doctors.html">Departments</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                            <div className="footer-item">
                                <div className="footer-links">
                                    <h3>Explore</h3>
                                    <ul>
                                        <li>
                                            <a href="blog.html">Blog</a>
                                        </li>
                                        <li>
                                            <a href="appointment.html">Appointment</a>
                                        </li>
                                        <li>
                                            <a href="shop.html">Shop</a>
                                        </li>
                                        <li>
                                            <a href="doctor-details.html">Portfolio</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Support</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                            <div className="footer-item">
                                <div className="footer-links">
                                    <h3>Support</h3>
                                    <ul>
                                        <li>
                                            <a href="contact.html">Online Support</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Free Consultancy</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">24/7 Service</a>
                                        </li>
                                        <li>
                                            <a href="tel:123456789">Make Call</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact Support</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-item">
                                <div className="footer-hours">
                                    <h3>Opening Hours</h3>
                                    <ul>
                                        <li>
                                            Sun:
                                            <span>09:00 AM - 09:00 PM</span>
                                        </li>
                                        <li>
                                            Mon:
                                            <span>09:00 AM - 09:00 PM</span>
                                        </li>
                                        <li>
                                            Tue:
                                            <span>09:00 AM - 09:00 PM</span>
                                        </li>
                                        <li>
                                            Wed:
                                            <span>09:00 AM - 09:00 PM</span>
                                        </li>
                                        <li>
                                            Thu:
                                            <span>09:00 AM - 09:00 PM</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <p>Copyright @</p>
                        </div>
                        <div className="col-lg-6">
                            <ul>
                                <li>
                                    <a href="terms-conditions.html">Terms &amp; Conditions</a>
                                </li>
                                <li>
                                    <a href="privacy-policy.html">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
           {/* <div className="go-top">
                <i className="bx bxs-up-arrow-alt"/>
                <i className="bx bxs-up-arrow-alt"/>
            </div>*/}
        </div>

    );
};

export default LandingPage;