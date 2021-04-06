import { Col } from 'antd';

function Details(props) {
    // if (document.getElementById('messages-container') === null) setTimeout(() => {
    if (document.getElementById('first-column') === null) setTimeout(() => {
        // const messagesContainer = document.getElementById('messages-container');
        const messagesContainer = document.getElementById('first-column');

        messagesContainer?.classList.remove('ant-col-24'); // on the initial load of /details the DOM with the messages-container hasn't yet loaded, hence why the nedd for the optional chaining
        messagesContainer?.classList.add('ant-col-16');


        // const channelHeader = document.getElementById('channel-header');
        const channelHeader = document.querySelector('.site-page-header');
        console.log(channelHeader);
        channelHeader?.classList.add('ant-col-16');
    }, 3000); // otherwise on an initial load on '/details' the class of the messages container won't be updated because the element isn't yet rendered => the details column won't show, because the column will still be with span={24}

    //!! make a send button for the message textarea
    return (
        <Col
            span={8}
            style={{ border: '2.5px solid black', height: '60vh' }}
            className="column-with-slider"
            id="second-column"
        >
            <h2><i>Hello, world</i> from Details Container!</h2>
        </Col>
    );
}

export default Details;