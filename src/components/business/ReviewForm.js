import React from 'react'
import {Button, Container, FormGroup} from "reactstrap";
import TinyMCE from "react-tinymce";

const createMarkup = (review) =>{
  return {__html: review.review};
};

const ReviewForm = (props) => {
  let review_list = props.reviews.map((review, index)=>(<ul className="review" key={index}><li  dangerouslySetInnerHTML={createMarkup(review)}>
  </li>
    <li className="profile-labels">Added on: {review.date_created}</li><br/>
  </ul>));
  return (
    <Container>
      <div className="content-right">
        <form id="add-review" onSubmit={props.handleSubmit}>
          <div className={props.addReviewPermission}>
            <FormGroup >
              <h3 >Add Business Review:</h3>
              <TinyMCE
                config={{
                  menubar: false,
                  statusbar: false,
                  plugins: 'autolink link image lists print preview',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                }}
                id = "content"
                onChange={props.handleReviewChange}
              />
            </FormGroup>
            <FormGroup>
              <Button  style={{borderRadius : "20px"}} className={"btn btn-lg btn-info btn-block"} >Add Review </Button>
            </FormGroup>
          </div>
          <FormGroup>
            <h4> Business Reviews:</h4>
            {review_list}
          </FormGroup>
        </form>
      </div>
    </Container>
  )
};
export default ReviewForm;

