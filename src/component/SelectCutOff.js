
import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

export default class SelectChannel extends Component {
    constructor(props) {
        super(props);
        let options = this.props.options || [
            { value: '00:00:00', label: 'cutOff1'},
            { value: '09:00:00', label: 'cutOff2'},
            { value: '12:00:00', label: 'cutOff3'},
            { value: '13:00:00', label: 'cutOff4'}
        ];
        this.state = {
            options: options,
            selectValue: options[0]
        }
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    onChange(val) {
        this.setState({selectValue:val});
        if(this.props.onChangeSelect){
            this.props.onChangeSelect(val);
        }
    }
    renderArrow() {
        return "";
    }

    render() {
        return (
            <div>
                <Select
                    onChange={this.onChange.bind(this)}
                    optionComponent={OptionsComponent}
                    options={this.state.options}
                    value={this.state.selectValue}
                    valueComponent={ValueComponent}
                    clearable={false}
                    placeholder=""
                    searchable={false}
                    autosize={true}
                />
            </div>
        )
    }
}
class OptionsComponent extends Component {
    constructor() {
        super();
    }
    handleMouseDown (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }
    handleMouseEnter (event) {
        this.props.onFocus(this.props.option, event);
    }
    handleMouseMove (event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    }
    render() {
        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown.bind(this)}
                 onMouseEnter={this.handleMouseEnter.bind(this)}
                 onMouseMove={this.handleMouseMove.bind(this)}
            >
                <span>
                    {this.props.children}
                </span>
            </div>
        );
    }
}
OptionsComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
}

class ValueComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="Select-value">
				{this.props.children}
            </div>
        );
    }
}
ValueComponent.propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object
}
