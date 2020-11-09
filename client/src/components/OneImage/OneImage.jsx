import React from 'react';
import '../OneImage/OneImage.css'


class OneImage extends React.Component {
    render() {
    return (      
        <img className="ui fluid centered rounded image" id="photo" 
        src="https://images.squarespace-cdn.com/content/v1/54d5402be4b0fa3826c298ce/1428959791721-C2GGA6NJWINHB6UW2HLN/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/finals-0001.jpg" 
        alt="bar"
        />
    );
};
}

export default OneImage;