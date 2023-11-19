import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hooks Examples</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/usestate">State</Nav.Link>
            <Nav.Link href="/usereducer">Reducer</Nav.Link>
            <Nav.Link href="/useeffect">Effect</Nav.Link>
            <Nav.Link href="/useref">Ref</Nav.Link>
            <Nav.Link href="/uselayouteffect">LayoutEffect</Nav.Link>
            <Nav.Link href="/useimperativehandle">ImperativeHandle</Nav.Link>
            <Nav.Link href="/usecontext">Context</Nav.Link>
            <Nav.Link href="/usememo">Memo</Nav.Link>
            <Nav.Link href="/usecallback">Callback</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
