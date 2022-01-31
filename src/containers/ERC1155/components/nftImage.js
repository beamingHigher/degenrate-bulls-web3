import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

class NftImage extends React.Component {
  constructor(props) {
    super(props)

    while (this.props.domElement.firstChild) {
      this.props.domElement.removeChild(
        this.props.domElement.firstChild,
      )
    }
  }

  render() {
    return ReactDOM.createPortal(
      <Fragment>
        <div>
          <img src={this.props.nftImage} style={ { height: "100px", width: "100px" }} alt="NFT image" />
        </div>
      </Fragment>,
      document.getElementById(this.props.domElement.id),
    )
  }
}

export default NftImage
