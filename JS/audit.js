    function auditRatioSVG(totalup,totaldown){
        const svg = d3.select('#auditChart');
        svg.selectAll('*').remove();


        const bbox = document.getElementById("auditChart").getBoundingClientRect();

        const width = bbox.width;
        const height = 600;
        const barHeight = 40;

        svg.attr('viewbox',`0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

        const ratioAudit = (totalup / totaldown).toFixed(1);

        const margin = {top: 50 , left: 100 , right:100 , bottom:50};
        const Gsvg = svg.append('g').attr(`transform`, `translate(${margin.left}, ${margin.top})`);


        const barWidth = Math.max(width - margin.left - margin.right, 0);

        Gsvg.append('rect')
        .attr('width', barWidth)
        .attr('height', barHeight)
        .attr('fill', '#4CAF50')
        .attr('rx', 4);

        Gsvg.append('rect')
            .attr('y', barHeight + 20)
            .attr('width', barWidth * 0.7)
            .attr('height', barHeight)
            .attr('fill', 'var(--background-color)')
            .attr('rx', 4);
    
        Gsvg.append('text')
            .attr('x', -10)
            .attr('y', barHeight / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .style('fill', 'var(--color)')
            .text('Done');

        Gsvg.append('text')
            .attr('x', -10)
            .attr('y', barHeight * 2 )
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .style('fill', 'var(--color)')
            .text('Received');

        Gsvg.append('text')
            .attr('x', barWidth + 10)
            .attr('y', barHeight / 2)
            .attr('dy', '0.35em')
            .style('fill', 'var(--color)')
            .text(`${(totalup / 1000000).toFixed(2)} MB ↑`);

        Gsvg.append('text')
            .attr('x', barWidth + 10)
            .attr('y', barHeight * 2 + 20)
            .attr('dy', '0.35em')
            .style('fill', 'var(--color)')
            .text(`${(totaldown / 1000000).toFixed(2)} MB ↓`);

      

        document.getElementById('ratio audit').innerText = "Your Ratio :"+ ratioAudit
            window.addEventListener('resize', () => {
                auditRatioSVG(totalup, totaldown);
            });
    }
    

