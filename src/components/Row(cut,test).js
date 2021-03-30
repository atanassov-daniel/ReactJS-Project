<Row>
    <Affix offsetBottom={10}>
        <span>
            <TextArea
                id="new-message-textarea"
                value={value}
                onChange={this.onChange}
                autoSize={{ minRows: 3, maxRows: 10 }}
                placeholder={`Message #channelName`}
                allowClear
            />
        </span>
    </Affix>
</Row>

<Row style={{ height: '100%', width: '100%' }}>
                                <Col
                                    flex={1}
                                    //!! style={{ border: '2.5px solid orange', height: '100%' }} -> the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    style={{ border: '2.5px solid orange', height: '50%' }}
                                    className="column-with-slider"
                                // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                                >