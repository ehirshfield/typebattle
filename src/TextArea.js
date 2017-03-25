import React, { Component } from 'react';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.processInput = this.processInput.bind(this);
        this.state = {
            input: '',
            spaces: 0
        };
    }
    calculateSpaces(text) {
        return text.split(' ').length - 1;
    }
    lastWordCorrect() {
        let currentWord = this.state.input.split(' ')[this.props.currentIndex];
        return this.props.text[this.props.currentIndex] === currentWord;
    }
    processInput(e) {
        this.setState({ input: e.target.value });
        let spaces = this.calculateSpaces(e.target.value);
        if (spaces > this.props.currentIndex) {
            if (this.lastWordCorrect()) {
                this.props.onCorrectWord();
            }
            this.setState({
                spaces: spaces
            });
        } else if (spaces < this.props.currentIndex) {
            this.props.onWordDeleted();
            this.setState({
                spaces: spaces
            });
        }
    }
    render() {
        return (
            <div>
                <textarea onChange = { this.processInput }
                className = "form-control"
                rows = "3"
                autoComplete = "off"
                autoCorrect = "off"
                autoCapitalize = "off"
                spellCheck = "false" >
                </textarea> 
            </div>
        );
    }
}
export default TextArea;