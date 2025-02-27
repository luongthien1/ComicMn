import React from "react";
import InfoBox from "../Hidden/InfoBox";
import axios from "axios";

/** required: 
 * @constructor
 * @param {string} path - current path
 * @param {array[string]} items - list of commic names */
export default class Sidebar extends React.Component {
    state = {
        items: null, 
        path: this.props.path
    };
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentWillMount() {
        this.get_dir().then((result) => {
            this.setState({ items: result });
        });
    }

    async get_dir() {
        try {
            const res = await axios.get('https://localhost:44340/comic/dirs', { params: { path: this.state.path } });
            for (var i = res.data.length - 1; i >= 0; i--) {
                console.log(res.data[i])
                if (res.data[i].includes("~$")) res.data.splice(i, 1)
            }
            return res.data;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    async read_docx(dir) {
        try {
            const res = await axios.get('https://localhost:44340/comic/file', { params: { path: dir } })
            return res.data
        }
        catch (err) {
            console.log(err);
            return "";
        }
    }

    dir_back = () => {
        this.setState({ path: this.state.path.replace("\\", "/").split("/").slice(0, -1).join("/") }, async () => {
            this.setState({items: await this.get_dir()});
        });
    }

    open_dir = (dir) => {
        const path = `${this.state.path}/${dir}`
        if (!dir.endsWith('.docx')) {  
            this.setState({ path: path }, async () => {
                this.setState({items: await this.get_dir()});
            });
        }
        else {
            this.read_docx(path).then((result) => {
                if (!dir.toLowerCase().startsWith('note')) {
                    this.props.setContent(this.state.path.split('/').slice(-1)[0], result, dir.replace('.docx', ''));
                }
                else {
                    this.props.setData({"data": result, "name": dir.replace('.docx', '')});
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        // check if doRefresh in props

        if ("doRefresh" in this.props) {
            if (this.props.doRefresh) {
                this.refresh();
                this.props.refresh();
            }
        }
    }

    refresh = () => {
        this.get_dir().then((result) => {
            this.setState({items: result});
        });
    }

    render() {
        return (
        <div class="sidebar" >
            <div class="path text-center border-bottom">
                <div class="row">
                    <div onClick={() => this.dir_back()} class="col-sm-auto cursor-pointer hover:bg-zinc-400 rounded-e-full py-1">{"<"}</div>
                    <div class="col text-ellipsis align-self-center">
                        {this.state.path.split("/").slice(-1)}
                    </div>
                    <div class="col-sm-auto">{""}</div>
                </div>
            </div>
            <div class="list-ul mt-2 px-2">
                {this.state.items? this.state.items.map((item) => (
                    <Item name={item.replace("\\", "/").split("/").slice(-1)[0]} onClick={this.open_dir}/>
                )) : null}
            </div>
        </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.item_ref = React.createRef();
        this.timer = null;
    }

    render() {
        return (
        <div class="item" ref={this.item_ref} 
        onMouseEnter={() => {
            this.timer = setTimeout(() => {
                if (this.timer) {
                    this.timer = null;
                    InfoBox.info(this.item_ref.current, this.props.name)
                }
            }, 1500);
        }}
        onMouseLeave={(event) => {
            if (this.timer) clearTimeout(this.timer);
            this.timer = null;
            InfoBox.hideinfo(event.target, event.clientX, event.clientY)
        }}
        onClick={() => {this.props.onClick(this.props.name); InfoBox.hideinfo(null, null, null, true);}}
        >
            <div class="item-content" subinfo>
            <div>{this.props.name}</div>
            </div>
        </div>
        );
    }
}
