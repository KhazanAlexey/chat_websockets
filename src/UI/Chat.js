import React from "react";

let chatStyle = {
    padding: '10px', border: '1px solid black', heigth: '600px',
    overflowY: 'scroll', width: '500px',
    margin: '0 auto',
    display:'flex',
    flexDirection:'column'

}

export class Chat extends React.Component {
    constructor(props) {
        super(props);
    };

    state = {messages: [{body: 'body message'}]};
    socket=null
    componentDidMount() {
        var baseUrl = 'social-network.samuraijs.com';

        this.socket = new WebSocket("wss://" + baseUrl + "/handlers/ChatHandler.ashx")
        this.socket.onmessage = this.onMessage.bind(this)

    }

    onKeyPress(e) {
        if (e.ctrlKey && e.charCode === 13) {

            this.socket.send(e.target.value)
            e.target.value = ''

        }
    };

    onMessage(messageEvent) {
        if (messageEvent.data) {
            let Newmessages = JSON.parse(messageEvent.data)
            this.setState({messages: [...this.state.messages, ...Newmessages]})
        }
    }

    render() {
        return <div>
            <h3>CHAT</h3>
            <div style={chatStyle}>
                {this.state.messages.map(m => <div style={{
                    padding: '10px', border: '1px solid black'}}><img style={{float:'left'}} src={m.photo}/>
                    <div style={{float:'left'}}>{m.userName}</div>{m.message}</div>)}
            </div>
            <div style={{padding: '10px'}}>
                <textarea onKeyPress={this.onKeyPress.bind(this)}></textarea>

            </div>

        </div>
    }
}