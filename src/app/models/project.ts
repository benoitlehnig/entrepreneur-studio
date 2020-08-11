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
	public problem:string="";
	public existingAlternatives:string="";
	public solution:string="";
	public keyMetrics:string="";
	public usp:string="";
	public unfairAdvantage:string="";
	public channels:string="";
	public customerSegmentation:string="";
	public earlyAdopters:string="";
	public costStructure:string="";
	public revenueStreams:string="";
}

