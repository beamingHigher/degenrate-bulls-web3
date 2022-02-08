import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

class TokenDisplay extends React.Component {
  constructor(props) {
    super(props)

    while (this.props.domElement.firstChild) {
      this.props.domElement.removeChild(
        this.props.domElement.firstChild,
      )
    }
  }

  closePopup() {
    this.props.domElement.classList.add('Hidden')
    this.props.domElement.classList.add('hidden')
  }

  render() {
    this.props.domElement.classList.remove('Hidden')
    this.props.domElement.classList.remove('hidden')
    return ReactDOM.createPortal(
      <Fragment>
        {/* <div>
          {this.props.message.toString()}
        </div>
          <a
            href={this.props.link}
            target="_blank"
            style={{ color: 'inherit' }}
          >
            {this.props.link === '#'
              ? 'Link Coming Soon!'
              : this.props.link.toString()}
          </a> */}
        <img
          src="https://uploads-ssl.webflow.com/61959cd789583069b45ea326/61fa8dd498a5d53d43a457d2_delete.png"
          loading="lazy"
          width="50"
          alt="close"
          class="popup-close-button"
          onClick={() => {
            this.closePopup()
          }}
        ></img>
        <div class="popup-wrapper-div">
          <div class="popup-text-block">
            {this.props.message.toString()}
          </div>
          <div class="popup-text-block">
            <a
              href={this.props.link}
              target="_blank"
              style={{ color: 'inherit' }}
            >
              {this.props.link === '#'
                ? 'Link Coming Soon!'
                : this.props.link.toString()}
            </a>
          </div>
        </div>
      </Fragment>,
      document.getElementById(this.props.domElement.id),
    )
  }
}

export default TokenDisplay
