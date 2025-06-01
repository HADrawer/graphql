function skillsSVG(data){

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? '#ffffff' : '#000000';
    const gridColor = isDarkMode ? '#888' : '#ccc';
    const polygonFill = isDarkMode ? '#1cd4a577' : '#1cd4a577';
    const polygonStroke = '#1cd4a5';


    const svg = d3.select('#skillsChart');
    svg.selectAll('*').remove();

    const latestSkillsMap = new Map();

    data.forEach(skill => {
        const key = skill.type.replace('skill_', '');
        latestSkillsMap.set(key, skill);
    });

    const skills = Array.from(latestSkillsMap, ([type, skill]) => ({
        type,
        amount: skill.amount
    }));

    const bbox = document.getElementById('skillsChart').getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;
    
    const radius = Math.min(width, height) / 2 - 40;
    const levels = 5;
    const center = { x: width / 2, y: height / 2 };

    svg.attr('width', width).attr('height', height);


    const angleSlice = (2 * Math.PI) / skills.length;
    const maxValue = 100;

    // Draw circular grid
    for (let lvl = 1; lvl <= levels; lvl++) {
        const r = radius * (lvl / levels);
        svg.append('circle')
            .attr('cx', center.x)
            .attr('cy', center.y)
            .attr('r', r)
            .attr('fill', 'none')
            .attr('stroke', gridColor)
            .attr('stroke-dasharray', '4 2');
    }

    // Axes and labels
    skills.forEach((skill, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = center.x + Math.cos(angle) * (radius );
        const y = center.y + Math.sin(angle) * (radius );

        

        svg.append('line')
            .attr('x1', center.x)
            .attr('y1', center.y)
            .attr('x2', x)
            .attr('y2', y)
            .attr('stroke', gridColor);

        svg.append('text')
            .attr('x', x)
            .attr('y', y)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .style('fill', textColor)
            .text(skill.type);
    });

    // Skill shape
    const points = skills.map((skill, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const value = (skill.amount / maxValue) * radius;
        const x = center.x + Math.cos(angle) * value;
        const y = center.y + Math.sin(angle) * value;
        return [x, y];
    });

    svg.append('polygon')
        .attr('points', points.map(p => p.join(',')).join(' '))
        .attr('fill', polygonFill)
        .attr('stroke', polygonStroke)
        .attr('stroke-width', 2);

        window.addEventListener('resize', () => {
            skillsSVG(data);
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            skillsSVG(data); 
        });
        
}