import React from 'react'
import { withRouter } from 'react-router-dom'
import { AddItemModal } from '../Common/Modals/AddItemModal'
import swal from 'sweetalert'

class AddItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpened: false,
        }
    }

    canAdd() {
        return Boolean(this.props.happyHourId)
    }

    closeAddItemModal() {
        this.setState({ modalOpened: false })
    }

    addNewItem() {
        if (!this.canAdd()) {
            swal('Please create a happy hour first.')
            return
        }

        this.setState({ modalOpened: true })
    }

    render() {
        return (
            <>
                <div className="ui grid">
                    <div className="twelve wide column"></div>
                    <div className="four wide column">
                        <i
                            className="big plus square outline icon addHappyHour"
                            onClick={this.addNewItem.bind(this)}
                        ></i>
                    </div>
                </div>
                <AddItemModal
                    isOpen={this.state.modalOpened}
                    onHide={this.closeAddItemModal.bind(this)}
                />
            </>
        )
    }
}

export default withRouter(AddItem)
