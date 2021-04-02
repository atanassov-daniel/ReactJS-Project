<Row style={{ height: '100%' }}>
<Col
    flex={1}
    style={{ border: '2.5px solid orange' }}
// scroll={{ x: 'calc(700px + 50%)', y: 240 }}
>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>
    <Row>3 / 5</Row>
    <Divider></Divider>

    {/* !!!!!
        <Col flex={3}> & <Col flex={2}> were the columns before I added the Affix, which broke everything
    */}
    <Affix offsetBottom={15}>
        <span>
            <TextArea
                id="new-message-textarea"
                value={value}
                onChange={this.onChange}
                autoSize={{ minRows: 2, maxRows: 10 }}
                // allowClear
                className="textarea"
                placeholder="Controlled autosize"
            />
        </span>
    </Affix>
    {/* <TextArea
            value={value}
            onChange={this.onChange}
            // placeholder="Controlled autosize"
            autoSize={{ minRows: 2, maxRows: 10 }}
            allowClear
            className="textarea"
        /> */}
    {/* </Affix> */}
</Col>
<Col flex={2} style={{ border: '2.5px solid orange' }}>2 / 5</Col>
</Row>