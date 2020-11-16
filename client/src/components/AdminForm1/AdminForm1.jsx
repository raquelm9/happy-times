import React from 'react'


class AdminForm1 extends React.Component {
    render() {
        return (

        <>
    <div className= "ui segment">
    <div className ="ui raised padded segment">
    <form className="ui form">
  <h4 className="ui dividing header">Restaurant Information</h4>

  <div className="field">
    <label>Name</label>
    <input type="text" name="restaurant-name" placeholder="Restaurant Name"/>
  </div>

  <div class="field">
    <label>Restaurant Address</label>
    <div class="fields">
    <div class="four wide field">
        <input type="text" name="restaurant[address-2]" placeholder="Unit #"/>
      </div>
      <div class="twelve wide field">
        <input type="text" name="restaurant[address]" placeholder="Street Address"/>
      </div>
    </div>
    </div>

    <div class="fields">
    <div class="three wide field">
      <input type="text" name="postalCode" maxlength="7" placeholder="Postal Code"/>
    </div>
    <div class="three wide field">
      <input type="text" name="city" placeholder="City"/>
    </div>
    <div class="three wide field">
    <input type="text" name="province" placeholder="Province"/>
    </div>
    </div>


  <div className="field">
      <label>Description</label>
      <textarea rows="4"></textarea>
  </div>

  <div className="field">
      <label>Website</label>
      <input type="text" name="restaurant-website" placeholder="Restaurant Website"/>
  </div>

  <div className="fields">
      <div className="ui twelve wide field">
      <label>Upload Image</label>
      <input type="text" name="restaurant-image" placeholder="Restaurant Image"/>
      </div>

      <div className=" ui four wide field">
          <label></label>
          <button className="ui button" style= {{ marginTop: 20}}>
            Upload Image
      </button>
      </div>
  </div>

  </form>
  </div>
  </div>

   <button class="ui primary right labeled right floated icon button">
   <i class="right arrow icon"></i>
   Next
 </button>

 </>


        );
    };
}

export default AdminForm1