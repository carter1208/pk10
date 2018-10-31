/**
 * Created by loc on 6/20/2017.
 */
import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

export default class SelectLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: this.props.options[0].value
        }
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    onChange(val) {
        this.setState({selectValue:val});
        if(this.props.onSelectChange){
            this.props.onSelectChange(val)
        }
    }

    render() {
        let options = this.props.options || [
                { value: 'en', label: 'English', icon: './assets/bunny.png'},
                { value: 'vn', label: 'Viet Nam', icon: './assets/bunny.png'},
                { value: 'fr', label: 'French', icon: './assets/bunny.png'}
            ];
        return (
            <div>
                <Select
                    arrowRenderer={this.renderArrow}
                    onChange={this.onChange.bind(this)}
                    optionComponent={OptionsComponent}
                    options={options}
                    value={this.state.selectValue}
                    valueComponent={ValueComponent}
                    clearable={false}
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
                 style={{display:'flex'}}
            >
                <div><img src='img/pk10Menu.png'/></div>&nbsp;&nbsp;
                <div style={{width:'50px'}}><img src={this.props.option.icon} width='100%' height='100%'/></div>
                {this.props.children}
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
            <div className="Select-value" style={{maxWidth:'90%'}}>
				<span className="Select-value-label" style={{display:'flex'}}>
					<div><img src='img/pk10Menu.png'/></div>
					<div><img src={this.props.value.icon == 'img/logo_77.png' ? 'img/logo77.png' : this.props.value.icon} width={'70%'} height={'70%'}/></div>
                    {this.props.children}
				</span>
            </div>
        );
    }
}
ValueComponent.propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.object
}
