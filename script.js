scale=10;
printer_align_Xcorrection=0.695/2;
// A4 = 210 × 297 
paperSizeXmm=297;
paperSizeYmm=210;

function drawHexagrams(){
	$('hexagram').each(function (index, value) {
		//console.log('hexagram' + index + ':' + $(this).attr('l'));
		target=$(this);
		lines=$(this).attr('l').split('');
		$.each(lines,function(i,v){
			//console.log(i+":"+v);
			if(v==0){makeYin(target);}
			if(v==1){makeYang(target);}
		});
	});
}

function makeYin(box){
	yin=$('<yin>');
	box.prepend(yin);
}

function makeYang(box) {
	yang=$('<yang>');
	box.prepend(yang);	
}

function readfile(file){
  $.ajax({url: file, success: function(result){
    makeBook(result+'\n');
  }});
}

function makeBook(icfull){
	document.body.innerHTML="";
	ic=icfull.split("\n");
	pg=0; i=0;
	plr='pleft';
	while(ic[i]!=null){
		pg++;
		plr=plr=='pleft'?'pright':'pleft';
		if(pg==1){
			//make cover
			page=newPage('cover',pg);
			idSeq=['cover_image','title','subtitle','author','edition','year'];
			ids=0;
			while(ic[i]!=""){
				if(idSeq[ids]=='cover_image'){
					l=$('<img>');
					l.attr('id',idSeq[ids]);
					l.attr('src','doublehappiness.jpg');
					page.append(l);i--;
				}else{
					l=$('<p>');
					l.attr('id',idSeq[ids]);
					l.text(ic[i]);
					page.append(l);
				}
				i++; ids++;
			}
			$(document.body).append(page);
		}
		if(pg==2){
			//make trigrams
			page=newPage(plr,pg);
			while(ic[i]!=""){
				if(ic[i].match(/^\d+$/)){
					p=$('<p>');
					txt="<hexagram l='"+ic[i]+"'></hexagram>";
					i++;
					while(ic[i].match(/^\d+$/)==null){
						if(ic[i]==''){break;}
						txt+=ic[i]+"<br>";
						i++;
					};
					//if(ic[i]==''){i--;break;}
					//console.log(i+1, ic[i]);
					i--;
					txt=txt.replace(/gram\>(\w)/g,'gram><b>$1');
					txt=txt.replace(/\s\|/g,'</b> |');
					p.html(txt);
					page.append(p);
				}
				i++;
			}
			$(document.body).append(page);
		}
		if(pg==3){
			//make table
			page=newPage(plr,pg);
			page.html(`
			<table>
			<tr><td></td><td><hexagram l="111"></hexagram></td><td><hexagram l="100"></hexagram></td><td><hexagram l="010"></hexagram></td><td><hexagram l="001"></hexagram></td><td><hexagram l="000"></hexagram></td><td><hexagram l="011"></hexagram></td><td><hexagram l="101"></hexagram></td><td><hexagram l="110"></hexagram></td></tr>
			<tr><td><hexagram l="111"></hexagram></td><td>1</td><td>34</td><td>5</td><td>26</td><td>11</td><td>9</td><td>14</td><td>43</td></tr>
			<tr><td><hexagram l="100"></hexagram></td><td>25</td><td>51</td><td>3</td><td>27</td><td>24</td><td>42</td><td>21</td><td>17</td></tr>
			<tr><td><hexagram l="010"></hexagram></td><td>6</td><td>40</td><td>29</td><td>4</td><td>7</td><td>59</td><td>64</td><td>47</td></tr>
			<tr><td><hexagram l="001"></hexagram></td><td>33</td><td>62</td><td>39</td><td>52</td><td>15</td><td>53</td><td>56</td><td>31</td></tr>
			<tr><td><hexagram l="000"></hexagram></td><td>12</td><td>16</td><td>8</td><td>23</td><td>2</td><td>20</td><td>35</td><td>45</td></tr>
			<tr><td><hexagram l="011"></hexagram></td><td>44</td><td>32</td><td>48</td><td>18</td><td>46</td><td>57</td><td>50</td><td>28</td></tr>
			<tr><td><hexagram l="101"></hexagram></td><td>13</td><td>55</td><td>63</td><td>22</td><td>36</td><td>37</td><td>30</td><td>49</td></tr>
			<tr><td><hexagram l="110"></hexagram></td><td>10</td><td>54</td><td>60</td><td>41</td><td>19</td><td>61</td><td>38</td><td>58</td></tr>
			</table>
			`);
			$(document.body).append(page);
			i--;
		}
		if((pg>=4)&&(pg<=35)){			
			console.log(i+1, ic[i]);
			//make pages
			page=newPage(plr,pg);
			twice=1;
			while(twice<=2){
				if(ic[i].match(/^\d+$/)){
					p=$('<p>');
					txt="<hexagram l='"+ic[i]+"'></hexagram>";
					i++;
					txt+="<b>"+ic[i]+"</b><br>";
					i++;
					while(ic[i]!=""){
						txt+=ic[i]+" ";
						i++;
					};
					txt=txt.replace(/\ \|\ /g,'</b> | <b>');
					txt=txt.replace(/J\./g,'<b>J</b>.');
					txt=txt.replace(/I\./g,'<b>I</b>.');
					txt=txt.replace(/1\./g,'<b>1</b>.');
					txt=txt.replace(/2\./g,'<b>2</b>.');
					txt=txt.replace(/3\./g,'<b>3</b>.');
					txt=txt.replace(/4\./g,'<b>4</b>.');
					txt=txt.replace(/5\./g,'<b>5</b>.');
					txt=txt.replace(/6\./g,'<b>6</b>.');
					txt=txt.replace(/Todas\./g,'<b>Todas</b>.');
					txt=txt.replace(/All lines\./g,'<b>All lines</b>.');
					p.html(txt);
					page.append(p);
				}
				twice++;i++;
			}
			i--;
			$(document.body).append(page);
		}
		i++;
	}
	drawHexagrams();

	//pg++;
	page=newPage('backcover',pg);
	l=$('<img>');
	l.attr('id','glyphs');
	l.attr('src','glyphs.jpg');
	page.append(l);
	$(document.body).append(page);

	makeInterface();

}

function newPage(pclass, pnum){
	page=$('<div>');
	page.addClass('page '+pclass);
	page.attr('id','page'+pnum);
	return page;
}



function makeInterface(){
	interface=$('<div>');
	interface.addClass('interface');
	altlang=lang=="port"?"eng":"port";
	interface.html(`
		<input type="button" name="language" onclick="changeLang('`+altlang+`');" value="`+lang+`"></input>
		<input type="button" onclick="doPrint('front');" value="Print Front"></input>
		<input type="button" onclick="doPrint('back');" value="Print Back"></input>
	`);
	$(document.body).prepend(interface);
}

function changeLang(nl){
	readfile("ic-"+nl+".txt");
	lang=nl;
}

function doPrint(side){
	i=1;
	while(document.getElementById('page'+i)){
	var div = $("<div />", {
		html: '&shy;<style>@media print { #page' + i + ' { display:none; } }</style>'
		}).appendTo("body");
		i++;
	}
	
	pages_front=
[	[	36	,	1	,	34	,	3	,	32	,	5	]	,
	[	30	,	7	,	28	,	9	,	26	,	11	]	,
	[	24	,	13	,	22	,	15	,	20	,	17	]	];

	pages_back =
[	[	6	,	31	,	4	,	33	,	2	,	35	]	,
	[	12	,	25	,	10	,	27	,	8	,	29	]	,
	[	18	,	19	,	16	,	21	,	14	,	23	]	];

	pages_exception = [24,"line-height:32pt;"];

	mx=[];
	mx=side=='front'?pages_front:pages_back;
	
	ln=0;
	while(mx[ln]){
		co=0;
		while(mx[ln][co]){
			x=co*4.5*scale;
			y=ln*4.5*scale;
			calcCenterX=((29.7*scale)-(4.5*6*scale))/2;
			calcCenterY=((21.0*scale)-(4.5*3*scale))/2;
			x+=calcCenterX+(printer_align_Xcorrection*scale);
			y+=calcCenterY;
			ex=0;
			exception="";
			while(pages_exception[ex]){
				if(pages_exception[ex]==mx[ln][co]){exception=pages_exception[ex+1];}
				ex+=3;
			}
			stylePrint(mx[ln][co],x,y,exception);
			makeCut(mx[ln][co],cut[ln][co],x,y);
			if(side=='back'){
				//$('#page'+mx[ln][co]).css('transform','rotate(180deg)');
			}
			co++;
		}
		ln++;
	}
	var div = $("<div>");
	div.html('<style>@media print { html, body { width:'+(paperSizeXmm*scale)+'mm; height:'+(paperSizeYmm*scale)+'mm; } @page {size: '+(paperSizeXmm*scale)+'mm '+(paperSizeYmm*scale)+'mm; margin:0; } }</style>');
	div.css('display','none');
	div.css('position','fixed');
	$(document.body).append(div);
	window.print();
}

calcCenterX=(paperSizeXmm-(45*6))/2/10;
calcCenterY=(paperSizeYmm-(45*3))/2/10;


function stylePrint(pag,x,y,exception) {
	  var div = $("<div>");
	  div.html('<style>@media print { #page' + pag + ' { position:absolute;display:inline-flex;top: '+y+'cm; left: '+x+'cm; '+exception+'} }</style>');
	div.css('display','none');
	div.css('position','fixed');
	$(document.body).append(div);
  
}

cut =
[	[	"ulu ull dll"	,		,	"ulu"	,		,	"ulu"	,	"uru urr drr"	]	,
	[					,		,			,		,			,					]	,
	[	"ull dll dld"	,		,	"dld"	,		,	"dld"	,	"drd urr drr"	]	];

function makeCut(pn,cs,x,y){
	if(!cs)return false;
	cls=cs.split(' ');
	il=0;
	while(cls[il]){
		cl=$("<cut>");
		if(cls[il].match(/ulu/)){
			cl.css("height",(0.45*scale)+"cm");
			cl.css("left",(-0.02*scale)+"cm");
			cl.css("top",(-0.5*scale)+"cm");
		console.log(pn);
		}
		if(cls[il].match(/ull/)){
			cl.css("width",(0.45*scale)+"cm");
			cl.css("left",(-0.5*scale)+"cm");
			cl.css("top",(-0.02*scale)+"cm");
		}
		if(cls[il].match(/dll/)){
			cl.css("width",(0.45*scale)+"cm");
			cl.css("left",(-0.5*scale)+"cm");
			cl.css("bottom",(-0.02*scale)+"cm");
		}
		if(cls[il].match(/uru/)){
			cl.css("height",(0.45*scale)+"cm");
			cl.css("right",(-0.02*scale)+"cm");
			cl.css("top",(-0.5*scale)+"cm");
		}
		if(cls[il].match(/urr/)){
			cl.css("width",(0.45*scale)+"cm");
			cl.css("right",(-0.5*scale)+"cm");
			cl.css("top",(-0.02*scale)+"cm");
		}
		if(cls[il].match(/drr/)){
			cl.css("width",(0.45*scale)+"cm");
			cl.css("right",(-0.5*scale)+"cm");
			cl.css("bottom",(-0.02*scale)+"cm");
		}
		if(cls[il].match(/dld/)){
			cl.css("height",(0.45*scale)+"cm");
			cl.css("left",(-0.02*scale)+"cm");
			cl.css("bottom",(-0.5*scale)+"cm");
		}
		if(cls[il].match(/drd/)){
			cl.css("height",(0.45*scale)+"cm");
			cl.css("right",(-0.02*scale)+"cm");
			cl.css("bottom",(-0.5*scale)+"cm");
		}
		
		
		
		$('#page'+pn).append(cl);	
		il++;
	}
}

lang="port";
changeLang(lang);
//setTimeout(function(){doPrint("front")},500);
