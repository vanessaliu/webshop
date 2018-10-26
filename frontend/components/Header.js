import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import User from './User';


Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.green};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
  
`;
const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
    .bar-logo-name {
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        img {
          width: 30px;
        }
        @media (max-width: 1300px) {
          grid-template-columns: 1fr auto;
          justify-content: center;
        }
        p {
           margin: 5rem 0 0 2rem;
           @media (max-width: 1300px) {
              margin: 2.5rem 5rem 0 2rem;
            }
        }
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <User>
      {({ data: { me } })=>(
        <div className="bar">
          <div className="bar-logo-name">
            <Logo>
              <Link href="/">
                <a><img src="https://res.cloudinary.com/chen-images/image/upload/v1540546883/samples/spotify-2-logo-black-and-white.png" alt="spotify logo"/> web shop</a>
              </Link>
            </Logo>
            <p>{me && me.name}</p>
          </div>
          <Nav></Nav>
        </div>
      )
      }
    </User>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
)

export default Header;