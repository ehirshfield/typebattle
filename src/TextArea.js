import React, { Component } from 'react';
import './TextArea.css';
class TextArea extends Component {
    constructor(props) {
        super(props);
        this.processInput = this.processInput.bind(this);
        this.preventPaste = this.preventPaste.bind(this);
        this.checkIfDisabledKey = this.checkIfDisabledKey.bind(this);
        this.preventSelect = this.preventSelect.bind(this);
        this.state = {
            input: ''
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
        } else if (spaces < this.props.currentIndex) {
            this.props.onWordDeleted();
        }
    }
    preventPaste(e){
        e.preventDefault();
    }
    checkIfDisabledKey(e){
        //left and right keys should be disabled
        if(e.keyCode === 39 || e.keyCode === 37){
            e.preventDefault();
        }
    }
    preventSelect(e){
        const textAreaValue = e.target.value;
        e.target.value = '';
        e.target.value = textAreaValue;
    }
    render() {
        return (
            <div>
                <textarea 
                onChange={this.processInput}
                onPaste={this.preventPaste}
                onKeyDown={this.checkIfDisabledKey}
                onSelect={this.preventSelect}
                className="form-control"
                rows="3"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false" >
                </textarea> 
            </div>
        );
    }
}
export default TextArea;