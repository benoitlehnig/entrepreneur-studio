export class Project {
	public ownerUid:string="";
	public summary:Summary = new Summary();
	public tags:Array<string>=[];
	public businessCanvas:BusinessCanvas= new BusinessCanvas()

}

export class Summary {
	public name:string="nouveau projet";
	public websiteUrl:string="";
	public logoUrl:string="";
	public elevatorPitch:string="";
}

export class BusinessCanvas {
	public problem:Array<Item> =[];
	public existingAlternatives:Array<Item>=[];
	public solution:Array<Item>=[];
	public keyMetrics:Array<Item>=[];
	public usp:Array<Item>=[];
	public unfairAdvantage:Array<Item>=[];
	public channels:Array<Item>=[];
	public customerSegmentation:Array<Item>=[];
	public earlyAdopters:Array<Item>=[];
	public costStructure:Array<Item>=[];
	public revenueStreams:Array<Item>=[];
}

export class Item {
	public text:string="nouveau projet";
}
