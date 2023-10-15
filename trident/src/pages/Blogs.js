import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Blogs() {
  return (
    <div className="pt-3 pb-2 mb-3">
      <h2>Blogs</h2>
      <hr />
      <div className="row">
        <div className="col col-md-2">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
