$(document).ready(function () {
  const margin = { top: 60, right: 60, bottom: 60, left: 60 },
    width = 1460 - margin.left - margin.right,
    height = 760 - margin.top - margin.bottom;
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left + 20}, 30)`);
  var xScale = d3.scaleLinear().domain([0, 100]).range([0, 900]);
  var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  var yAxis = d3.axisLeft(yScale);

  var xAxis = d3.axisBottom(xScale);
  const decition_row = Array.from(
    d3.select("table").selectAll("tr")
    // .filter((d, i) => i > 0)
  );

  var glob_arr = [];
  for (i of decition_row) {
    var array = new Array();

    Array.from(i.children).forEach((e, i) => {
      console.log(e.textContent);

      array.push(e.textContent);
    });
    glob_arr.push(array);

    const lagendrow = Array.from(
      d3
        .select("table")
        .selectAll("tr")
        .filter((d, i) => i == 0)
    );
    var lagendarr = [];
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    lagendrow.forEach((d, i) => {
      Array.from(d.children).forEach((o, i) => {
        if (i > 0) {
          let p = {};
          p.title = o.innerText;
          p.color = colors(i);
          // lagendarr.push(o.innerText);
          // console.log(colors(i));
          lagendarr.push(p);
        }
      });
      // console.log();
    });
    console.log(lagendarr);
    var lagend = svg
      .append("g")
      .attr("class", "lagend")
      .attr("display", "none")
      .attr("border", "1px black solid")
      .attr("transform", `translate(0,500)`)
      .selectAll("circle")
      .data(lagendarr)
      .join("circle")
      .attr("cx", 1100)
      .attr("cy", (d, i) => 300 * (i / 7.5))
      .attr("fill", (d, i) => d.color)
      .attr("r", 10);
    d3.select(".lagend")

      .selectAll("text")
      .data(lagendarr)
      .join("text")
      .attr("x", 1150)
      .attr("y", (d, i) => 300 * (i / 7))
      .text((d) => d.title);
    //   console.log(glob_arr[2]);
  }
  var la2 = [];

  svg
    .append("g")
    .classed("xaxis", true)
    .attr("transform", `translate(23,${height})`)
    .call(xAxis);
  svg
    .append("g")
    .classed("yaxis", true)
    .attr("transform", `translate(23, 0)`)
    .call(yAxis);

  console.log(glob_arr);
  var alert_arr = [];
  var arr2 = [];
  var circlearray = [];
  var dataarray = [];

  // datas = {};
  // console.log(circlearray); //circle 數字資料
  // circlearray.forEach((d) => {
  //   datas.numbers = d;
  //   datas.title = i[0];
  //   dataarray.push(datas);
  // });
  console.log(glob_arr);
  var arrays = [];
  var news = [];
  glob_arr.forEach((d, i) => {
    datas = {};
    datas.title = d[0];
    d = d.slice(1, d.length);
    d = d.map((d) => Number(d));
    datas.num = d;
    arrays.push(datas);
  });
  console.log(arrays);
  d3.select("table")
    .selectAll("tr")
    .data(arrays)
    .join("tr")
    // .filter((d, i) => i >= 1)
    .filter((d, i) => i != 0)
    .on("click", (d, i) => {
      // console.log(d.target.parentElement);
      // console.log(d);

      if (news.length < 2) {
        news.push(i);
      }
      news.forEach((k) => {
        if (news.includes(k) && d.target.parentElement.__data__ == k) {
          // console.log(k);
          // console.log(d.target.parentElement.__data__ == k);
          if (!d.target.parentElement.classList.contains("tableclick")) {
            // console.log(news);
            d.target.parentElement.classList.add("tableclick");
          } else if (d.target.parentElement.classList.contains("tableclick")) {
            const inx = news.indexOf(k);
            news.splice(inx, 1);
            news = [];

            Array.from(d3.select("svg").selectAll("text")).forEach(
              (cla, ix) => {
                // if (
                //   cla.classList.contains("x label") ||
                //   cla.classList.contains("y label")
                // ) {

                // }
                if (cla.classList.contains("label")) {
                  cla.remove();
                  // console.log(cla);
                }
                // console.log(cla);
              }
            );
            var xScale = d3.scaleLinear().domain([0, 100]).range([0, 900]);
            var yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
            var yAxis = d3.axisLeft(yScale);

            var xAxis = d3.axisBottom(xScale);
            svg.select(".xaxis").transition().call(xAxis);
            svg.select(".yaxis").transition().call(yAxis);

            // d3.select("svg").selectAll("text").remove();
            // console.log(inx);
            // console.log(decition_row);
            decition_row.forEach((e) => {
              if (e.classList.contains("tableclick")) {
                e.classList.remove("tableclick");
              }
            });
            svg.selectAll(".colorcircle").remove();
            svg.selectAll(".text2").remove();
            // console.log(news);
            // d.target.parentElement.classList.remove("tableclick");

            // console.log(news);
          }
        }
      });
      if (news.length == 2) {
        drawCircle(news);
        // console.log(news);
      }
      // console.log(d.target.parentElement.__data__);
      // if (alert_arr.length < 2) {

      // d.target.parentElement.classList.toggle("tableclick");
      // if (d.target.parentElement.classList.contains("tableclick")) {
      //   console.log(d);
      //   alert_arr.push(i[0]);
      // } else {
      //   const found = alert_arr.find((element) => element == i[0]);
      //   if (alert_arr.includes(found)) {
      //     const inx = alert_arr.indexOf(found);
      //     alert_arr.splice(inx, 1);
      //   }

      //   console.log(alert_arr);
      // }
      // console.log(circlearray);

      // }
      // alert(alert_arr);
    });
  // console.log(a);
  let drawCircle = function (data) {
    // console.log(d);

    // xScale = d3.scaleBand().domain(comparearr).range([0, width]);
    // xAxis = d3.axisBottom(xScale);
    // function isStringorInt(arr) {
    //   var ars = arr.map(Number).filter((d, i) => !isNaN(d));

    //   return ars;
    // }
    // var comparearr = comparearr.map(Number);
    // console.log(comparearr);
    // comparearr = isStringorInt(comparearr);
    // circlearray.push(comparearr);
    console.log(data);
    $("#produce").show();
    xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].num, (d) => d)])
      .range([0, 900])

      .nice();

    xAxis = d3.axisBottom(xScale).ticks(6);

    d3.select(".xaxis").transition().call(xAxis);
    // console.log(d[0]);
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width / 3 + 80)
      .attr("y", height + margin.bottom - 5)
      .text(data[0].title);

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("writing-mode", "tb")
      .attr("x", -margin.left - 5)
      .attr("y", height / 2)
      .text(data[1].title);

    yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[1].num, (d) => d)])
      .range([height, 0])
      .nice();
    yAxis = d3.axisLeft(yScale);
    d3.select(".yaxis").transition().call(yAxis);
    d3.select(".lagend").attr("display", "visible");
    console.log(data);
    console.log(data);
    // var ars = [];

    // ars.push(data[1]);
    // data.forEach((s, k) => {
    //   ars.push([s]);
    // });
    // console.log(ars);
    dataob = {};
    var newda = [];
    data[0].num.forEach((da, ix) => {
      // dataob.x.title=da[0].title
      console.log(data[0].title);

      console.log(data[1].title);
      console.log(da);
      var newdata = {};
      dataob.x = {};
      dataob.x.title = data[0].title;
      dataob.x.value = da;
      dataob.y = {};
      dataob.y.title = data[1].title;
      dataob.y.value = data[1].num[ix];
      newdata.x = dataob.x;
      newdata.y = dataob.y;
      newda.push(newdata);
    });
    console.log(newda);
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    svg.append("g").attr("class", "groups");

    function dragstarted(event, d) {
      d3.select(this).raise().attr("stroke", "blue").attr("stroke-width", "2");
      // d3.select(this).attr("cx", event.x).attr("cy", event.y);
    }
    var counts = 1;
    function dragged(event, d) {
      d.x = event.x;
      d.y = event.y;
      var k = this;

      console.log(k.cx.baseVal.value);
      Array.from(d3.select("svg").selectAll(".colorcircle")).forEach((a, b) => {
        if (a != k) {
          if (
            a.cx.baseVal.value <= k.cx.baseVal.value + 20 &&
            a.cx.baseVal.value >= k.cx.baseVal.value - 20
          ) {
            if (counts == 1) {
              console.log("true");
              console.log(k.cx.baseVal.value - 20);
              console.log(k.cx.baseVal.value + 20);
              svg

                .append("rect")
                .attr("class", "rects")
                .attr("width", 100)
                .attr("height", yScale(0))
                .attr("x", k.cx.baseVal.value - 45)

                .attr("fill", "yellow");
              svg
                .append("text")
                .attr("class", "tooltext")
                .attr("x", k.cx.baseVal.value - 30)
                .attr("y", (d, i) => {
                  return 300;
                })
                .text((d, i) => {
                  // var htmlObject = document.createElement("div");
                  // htmlObject.appendChild(d.x.title);

                  // console.log(htmlObject2);
                  return "拖曳到這裡 放開!! even swap";
                });
              counts++;
            }
          } else if (
            a.cx.baseVal.value < k.cx.baseVal.value + 30 &&
            a.cx.baseVal.value > k.cx.baseVal.value - 30
          ) {
            console.log("true");
            d3.select("svg").select(".rects").remove();
            d3.select("svg").select(".tooltext").remove();
          }
        }
      });
      d3.select(this).attr("cx", d.x).attr("cy", d.y);
    }

    function dragended(event, d) {
      d3.select(this)
        .attr("cx", () => d.x)
        .attr("cy", () => d.y);
      d3.select("svg").select(".rects").remove();
      d3.select("svg").select(".tooltext").remove();
    }
    var drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    function handleMouseOver(d, i) {
      // Add interactivity

      // Use D3 to select element, change color and size
      d3.select(this).attr("stroke", "blue");
      const k = this;
      Array.from(d3.select("svg").selectAll(".colorcircle")).forEach((d, i) => {
        if (d != k) {
          if (d.cx.baseVal.value != k.cx.baseVal.value) {
            svg

              .append("rect")
              .attr("class", "unrects")
              .attr("width", 60)
              .attr("height", yScale(0))
              .attr("x", d.cx.baseVal.value - 45)

              .attr("fill", "yellow");

            svg
              .append("text")
              .attr("class", "tooltexts")
              .attr("x", d.cx.baseVal.value - 30)
              .attr("y", (d, i) => {
                return 300;
              })

              .text((d, i) => {
                return "拖曳到這裡";
              });
          }
        }
      });
      // Specify where to put label of text
    }

    function handleMouseOut(d, i) {
      // Use D3 to select element, change color back to normal
      // Select text by id and then remove
      d3.selectAll(".unrects").remove();
      d3.select(this).attr("stroke", "none");
      d3.selectAll(".tooltexts").remove();
    }

    svg
      .select(".groups")

      .selectAll("circle")

      .data(newda)
      .join("circle")
      .classed("colorcircle", true)
      .attr("cx", (d, i) => {
        return xScale(d.x.value);
      })
      .attr("cy", (d, i) => {
        console.log(d);
        return yScale(d.y.value);
      })
      .attr("r", 14.5)
      .attr("fill", (d, i) => color(i))
      .call(drag)
      .on("click", (d, i) => {
        d.srcElement.cx.baseVal.value = xScale(i.x.value);
        d.srcElement.cy.baseVal.value = yScale(i.y.value);
        console.log(d);
        return d;
      })
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    svg

      .append("g")
      .classed("text2", true)
      .selectAll("text")
      .append("g")
      .data(newda)
      .join("text")
      .attr("x", (d, i) => {
        return xScale(d.x.value) + 15;
      })
      .attr("y", (d, i) => {
        return yScale(d.y.value) + 30;
      })
      .text((d, i) => {
        console.log(d.x.title);
        // var node = document.createElement("li");
        // var htmlObject = document.createElement("div");
        // htmlObject.appendChild(d.x.title);

        // console.log(htmlObject2);
        return d.x.title + ":" + d.x.value;
      });

    svg

      .append("g")
      .classed("text2", true)
      .selectAll("text")
      .append("g")
      .data(newda)
      .join("text")
      .attr("x", (d, i) => {
        return xScale(d.x.value) + 15;
      })
      .attr("y", (d, i) => {
        return yScale(d.y.value) + 60;
      })
      .text((d, i) => {
        // var node = document.createElement("li");
        // var htmlObject = document.createElement("div");
        // htmlObject.appendChild(d.x.title);

        // console.log(htmlObject2);
        return d.y.title + ":" + d.y.value;
      });

    // if (circlearray.length == 1) {
    // xScale = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(circlearray[0], (d) => d)])
    //   .range([0, 900])

    //   .nice();

    // xAxis = d3.axisBottom(xScale).ticks(6);

    // d3.select(".xaxis").transition().call(xAxis);
    // // console.log(d[0]);
    // svg
    //   .append("text")
    //   .attr("class", "x label")
    //   .attr("text-anchor", "end")
    //   .attr("x", width / 3 + 80)
    //   .attr("y", height + margin.bottom - 5)
    //   .text(d[0]);
    // } else if (circlearray.length == 2) {
    // $("#produce").show();
    //   svg
    //     .append("text")
    //     .attr("class", "y label")
    //     .attr("text-anchor", "end")
    //     .attr("writing-mode", "tb")
    //     .attr("x", -margin.left - 5)
    //     .attr("y", height / 2)
    //     .text(d[1]);

    //   yScale = d3
    //     .scaleLinear()
    //     .domain([0, d3.max(circlearray[1], (d) => d)])
    //     .range([height, 0])
    //     .nice();
    //   yAxis = d3.axisLeft(yScale);
    //   d3.select(".yaxis").transition().call(yAxis);
    // }

    // function lebelandnumber() {
    //   var labs = [];
    //   circlearray.forEach((k, x) => {
    //     labs = [];
    //     k.forEach((o, a) => {
    //       var item = {};
    //       var l = d[d.length - 1];

    //       item[l] = k[a];

    //       labs.push(item);
    //     });
    //   });

    //   la2.push(labs);
    //   console.log(la2);
    // }
    // lebelandnumber();

    // function drawlabels(la2) {
    //   svg

    //     .append("g")
    //     .classed("text1", true)
    //     .selectAll("text")
    //     .data(la2[0])
    //     .join("text")
    //     .attr("x", (d, i) => {
    //       console.log(Object.values(d)[0]);

    //       return xScale(Object.values(d)[0]) + 15;
    //     })
    //     .attr("y", (d, i) => {
    //       if (la2.length == 2) {
    //         var res = Object.values(la2[1][i])[0];

    //         return yScale(res) - 10;
    //       }
    //     })
    //     .text((d, i) => {
    //       if (la2.length == 2) {
    //         var ress = Object.entries(la2[1][i])[0];
    //         var resu2 = ress.join(":");
    //         var ress2 = Object.entries(d)[0].join(":");
    //         var htmlObject = document.createElement("div");
    //         htmlObject.innerHTML = resu2;
    //         var htmlObject2 = document.createElement("div");
    //         htmlObject2.innerHTML = ress2;
    //         console.log(htmlObject2);

    //         return htmlObject.innerText;
    //       }
    //     });

    //   svg

    //     .append("g")
    //     .classed("text2", true)
    //     .selectAll("text")
    //     .data(la2[0])
    //     .join("text")
    //     .attr("x", (d, i) => {

    //       console.log(Object.values(d)[0]);

    //       return xScale(Object.values(d)[0]) + 15;
    //     })
    //     .attr("y", (d, i) => {
    //       if (la2.length == 2) {
    //         var res = Object.values(la2[1][i])[0];

    //         return yScale(res) + 30;
    //       }
    //     })
    //     .text((d, i) => {
    //       if (la2.length == 2) {
    //         var ress = Object.entries(la2[1][i])[0];
    //         var resu2 = ress.join(":");
    //         var ress2 = Object.entries(d)[0].join(":");
    //         var htmlObject = document.createElement("div");
    //         htmlObject.innerHTML = resu2;
    //         var htmlObject2 = document.createElement("div");
    //         htmlObject2.innerHTML = ress2;
    //         console.log(htmlObject2);

    //         return htmlObject2.innerText;
    //       }
    //     });
    // }
    // drawlabels(la2);
    // $(".text1").hide();
    // $(".text2").hide();
    // let drawallcircles = (data) => {
    //   var color = d3.scaleOrdinal(d3.schemeCategory10);
    //   // d3.select("#produce").on("click", function () {
    //   d3.select(".lagend").attr("display", "visible");
    //   $(".text1").show();
    //   $(".text2").show();
    //   if (data.length == 2) {
    //     svg
    //       .append("g")
    //       .selectAll("circle")
    //       .data(la2[0])
    //       .join("circle")
    //       .transition()
    //       .ease(d3.easeBounce)
    //       .attr("cx", (d, i) => {
    //         return xScale(Object.values(d)[0]);
    //       })
    //       .attr("cy", (d, i) => {

    //         var res = Object.values(data[1][i])[0];
    //         return yScale(res);
    //       })
    //       .attr("r", 14.5)
    //       .attr("fill", (d, i) => color(i));
    //   }
    // };
    // console.log(la2);
    // drawallcircles(la2);
  };
});
