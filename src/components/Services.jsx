import React, { Component } from "react";
import Title from "./Title";
import { DataService } from "./DataServices";

class Services extends Component {
  state = {
    services: DataService,
  };

  render() {
    const { services } = this.state;

    return (
      <section className="services">
        <Title title="Services" />
        <div className="services-center">
          {services.map((s) => (
            <article key={Math.random()} className="service">
              <span>{s.icon}</span>
              <h6>{s.title}</h6>
              <p>{s.info}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }
}

export default Services;
