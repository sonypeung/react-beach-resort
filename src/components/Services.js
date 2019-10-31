import React, { Component } from 'react'
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaCocktail/>,
                title:"Free cocktails",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                icon:<FaHiking/>,
                title:"Endless hiking",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                icon:<FaShuttleVan/>,
                title:"Transport from/to airport",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                icon:<FaBeer/>,
                title:"Free beers",
                info:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
        ]
    }
    render() {
        return (
            <section className="services"> 
                <Title title="services"></Title>
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return(
                            <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        )
    }
}
