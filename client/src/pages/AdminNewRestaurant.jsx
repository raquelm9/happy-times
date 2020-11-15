import React from "react";

class AdminNewRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <form className="ui form">
          <h4 className="ui dividing header">Restaurant Information</h4>
          <div className="field">
            <label>Name</label>
            <div className="one field">
              <div className="field">
                <input
                  type="text"
                  name="shipping[first-name]"
                  placeholder="Restaurant Name"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Address</label>
            <div className="fields">
              <div className="twelve wide field">
                <input
                  type="text"
                  name="shipping[address]"
                  placeholder="Street Address"
                />
              </div>
              <div className="four wide field">
                <input
                  type="text"
                  name="shipping[address-2]"
                  placeholder="Unit #"
                />
              </div>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>State</label>
              <select className="ui fluid dropdown">
                <option value="">State</option>
                <option value="AB">Alberta</option>
              </select>
            </div>
            <div className="field">
              <label>City</label>
              <select className="ui fluid dropdown">
                <option value="">City</option>
                <option value="CA">Calgary</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Country</label>
            <div className="ui fluid search selection dropdown">
              <input type="hidden" name="country" />
              <i className="dropdown icon"></i>
              <div className="default text">Select Country</div>
              <div className="menu">
                <div className="item" dataValue="ca">
                  <i className="ca flag"></i>Canada
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Website</label>
            <input type="email" placeholder="https://www.website.com/" />
          </div>
        </form>
      </>
    );
  }
}

export default AdminNewRestaurant;
