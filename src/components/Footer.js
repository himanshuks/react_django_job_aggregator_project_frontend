import React from "react";
// import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

// import { MDBIcon, MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBtn } from "mdbreact";
// import { SocialIcon } from "react-social-icons";
import '../stylesheets/Footer.css'
const FooterPage = () => {
  return (
    <>

      {/* <div className="Footer">

        <div className="Footerpart">

          <div className="Footercontent1">
           
            <ul>
              <h5>Support</h5>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="Footercontent2">
            <h5>Support</h5>
            <ul>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="Footercontent3">
            <h5>Support</h5>
            <ul>
              <li>Support</li>
              <li>Support</li>
              <li>Support</li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* <MDBFooter className="Footer">
        <MDBContainer fluid >
          <MDBRow className="Footerpart">

            <MDBCol align="center">
              <h5 >
                Support
            </h5>
              <br />
              <ul type="none">
                <li >FAQ</li>
                <br></br>
                <li>Contact</li>
                <br />
                <li >Support</li>
              </ul>
            </MDBCol>
            <MDBCol align="center"><br />
              <h5 >
                Legal
            </h5>
              <ul type="none">
                <li >Privacy Policy </li>
                <br />
                <li >Terms and Conditions</li>
                <br />
                <li>Comparision</li>
              </ul>
            </MDBCol>
            <MDBCol align="center" className="Footercontent3">
              <br />
              <h5 >
                Questions?
            </h5>
              <ul >
                <SocialIcon url="http://twitter.com/" />

                <SocialIcon url="http://facebook.com" />

                <SocialIcon url="http://linkedin.com/" />
                <br />
                <br />
                <span>
                  Email:
                <a href="https://www.Dreamsgate.com"> info@dreamsgate.com</a>
                </span>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.Dreamsgate.com"> Dreamsgate.com </a>
          </MDBContainer>
        </div>
      </MDBFooter> */}


      <footer className="page-footer">
        <div className="container">
          <div className="row">
            {/* <div className="col l6 s12">
              <h5 className="white-text">Footer Content</h5>
              <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </div> */}
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Support</h5><br />

              <span >FAQ</span>
              <br></br><br />
              <span>Contact</span>
              <br /><br />
              <span >Support</span>

            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Legal</h5><br />

              <span >Privacy Policy </span>
              <br /><br />
              <span >Terms and Conditions</span>
              <br /><br />
              <span>Comparision</span>


            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text1">Questions?</h5><br />
              <section id="lab_social_icon_footer">


                <div className="container">
                  <div className="text-center center-block">
                    <a href="https://www.facebook.com/"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                    <a href="https://twitter.com/"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                    <a href="https://plus.google.com/"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
                    <a href="mailto:#"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container4 text-center">
            © 2019 Copyright:
            <a className="grey-text text-lighten-4 right" style={{ color: "grey" }} href="https://dreamsgate.com/">&nbsp;dreamsgate.com</a>
          </div>
        </div>
      </footer>

    </>
  );
};

export default FooterPage;

    // import React from 'react';
// import {MDBIcon, MDBContainer, MDBBtn} from 'mdbreact';

// const SocialButtonsPage = () => {
//     return (
//         <MDBContainer>

//             <span className="counter">22</span>
//             <MDBBtn social="so" size="lg">
//                 <MDBIcon fab icon="stack-overflow" className="pr-1" /> Stack Overflow
//       </MDBBtn>
//             <span className="counter">22</span>
//             <MDBBtn social="so">
//                 <MDBIcon fab icon="stack-overflow" className="pr-1" /> Stack Overflow
//       </MDBBtn>
//             <span className="counter">22</span>
//             <MDBBtn social="so" size="sm">
//                 <MDBIcon fab icon="stack-overflow" className="pr-1" /> Stack Overflow
//       </MDBBtn>
//             <span className="counter">22</span>

//             <MDBBtn social="fb" size="lg">
//                 <MDBIcon fab icon="facebook-f" className="pr-1" />Facebook
//       </MDBBtn>
//             <MDBBtn social="fb">
//                 <MDBIcon fab icon="facebook-f" className="pr-1" />Facebook
//       </MDBBtn>
//             <MDBBtn social="fb" size="sm">
//                 <MDBIcon fab icon="facebook-f" className="pr-1" />Facebook
//       </MDBBtn>

//             <MDBBtn social="dribbble">
//                 <MDBIcon icon="dribbble" className="pr-1" />
//             </MDBBtn>
//             <MDBBtn social="dribbble">
//                 <MDBIcon icon="dribbble" className="pr-1" />
//             </MDBBtn>
//             <MDBBtn social="dribbble" size="sm">
//                 <MDBIcon icon="dribbble" className="pr-1" />
//             </MDBBtn>

//             <MDBBtn social="slack">
//                 <MDBIcon fab icon="slack" className="pr-1" />
//             </MDBBtn>
//             <span className="counter">22</span>
//             <MDBBtn social="slack">
//                 <MDBIcon fab icon="slack" className="pr-1" />
//             </MDBBtn>
//             <span className="counter">22</span>
//             <MDBBtn social="slack" size="sm">
//                 <MDBIcon fab icon="slack" className="pr-1" />
//             </MDBBtn>
//             <span className="counter">22</span>

//             <MDBBtn floating social="tw" size="lg">
//                 <MDBIcon fab icon="twitter" className="pr-1" />
//             </MDBBtn>
//             <MDBBtn floating social="tw">
//                 <MDBIcon fab icon="twitter" className="pr-1" />
//             </MDBBtn>
//             <MDBBtn floating social="tw" size="sm">
//                 <MDBIcon fab icon="twitter" className="pr-1" />
//             </MDBBtn>

//             <a href="#!" className="reddit-ic mr-3">
//                 <MDBIcon fab icon="reddit-alien" size="5x" />
//             </a>
//             <a href="#!" className="reddit-ic mr-3">
//                 <MDBIcon fab icon="reddit-alien" size="4x" />
//             </a>
//             <a href="#!" className="reddit-ic mr-3">
//                 <MDBIcon fab icon="reddit-alien" size="3x" />
//             </a>
//             <a href="#!" className="reddit-ic mr-3">
//                 <MDBIcon fab icon="reddit-alien" size="2x" />
//             </a>
//             <a href="#!" className="reddit-ic mr-3">
//                 <MDBIcon fab icon="reddit-alien" />
//             </a>

//         </MDBContainer>
//     );
// }

// export default SocialButtonsPage;
// < !–- Footer -–>

