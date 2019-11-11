/* eslint-disable indent */
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { ContentReviews, CRGlobalStyle } from './Components/Styles.jsx';
import CRHeader from './Components/CRHeader.jsx';

class CR_reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            displayCR: [],
            displayTop10: [],
            extendDisplayCR: [],
            extendAllReviews: false,
            count: {
                "Top Critic": 0,
                "Fresh": 0,
                "Spoiled": 0
            }
        };
        this.fetchCReviews = this.fetchCReviews.bind(this);
        this.fetchSortedReviews = this.fetchSortedReviews.bind(this);
        this.extendReviews = this.extendReviews.bind(this);
    }

    componentDidMount() {
        this.fetchCReviews();
    }

    setStateAfterSort(data) {
        this.setState({
            displayTop10: data.slice(0, 10),
            extendDisplayCR: data.slice(10)
        });
        // console.log("SETS: ",this.state);
    }

    extendReviews() {
        this.setState({
            extendAllReviews: !this.state.extendAllReviews
        });
        // console.log(this.state.extendAllReviews);
    }

    fetchSortedReviews(event) {
        let displayData;
        let param = event.target.id;
        if (param === "1") {
            displayData = this.state.displayCR.filter(item => item.rank == param);
            this.setStateAfterSort(displayData);
        }

        if (param === "fresh") {
            displayData = this.state.displayCR.filter(item => item.rate >= 3);
            this.setStateAfterSort(displayData);
        }

        if (param === "spoiled") {
            displayData = this.state.displayCR.filter(item => item.rate < 3);
            this.setStateAfterSort(displayData);
        }
        if (param === "all") {
            displayData = this.state.displayCR
            this.setStateAfterSort(displayData);
        }
    }

    fetchCReviews() {
        Axios.get('http://127.0.0.1:4540/api/cr_reviews')
            .then(results => {
                this.setState({
                    //randomly choose one movie name from db
                    movieName: results.data[Math.floor(Math.random() * 99)].movie_name,
                    displayCR: results.data
                })
            })
            .then(() => {
                this.setState({
                    displayCR: this.state.displayCR.filter(result => result.movie_name == this.state.movieName
                    )
                })
            })
            .then(() => {
                let tc, f, s;
                tc = this.state.displayCR.filter(result => result.rank == "1").length;
                f = this.state.displayCR.filter(result => result.rate >= 3).length;
                s = this.state.displayCR.length - f;

                this.setState({
                    count: {
                        "Top Critic": tc,
                        "Fresh": f,
                        "Spoiled": s,
                        "All": this.state.displayCR.length
                    }
                })
            })
            .then(() => this.setState({
                displayTop10: this.state.displayCR.slice(0, 10),
                extendDisplayCR: this.state.displayCR.slice(10)
            }))
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                // console.log(this.state);
            })
    }


    render() {
        // console.log("render",this.state);
        return (

            <ContentReviews className="content_reviews">
                <CRGlobalStyle />
                <CRHeader movieName={this.state.movieName} list={this.state.displayTop10}
                    extList={this.state.extendDisplayCR} extent={this.state.extendAllReviews} extendAR={this.extendReviews}
                    count={this.state.count} fetchSort={this.fetchSortedReviews} />
            </ContentReviews>
        )
    }
}

ReactDOM.render(<CR_reviews />, document.getElementById('cr'));