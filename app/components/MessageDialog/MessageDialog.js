import React, {PureComponent} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class MessageDialog extends PureComponent {
    constructor(props) {
        super(props)

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = () => {
        this.props.onRequestClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={<FlatButton label="OK" primary={true} onClick={this.handleClose}/>}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.message}
                </Dialog>
            </div>
        );
    }
}
