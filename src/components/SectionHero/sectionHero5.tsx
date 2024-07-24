const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  heading = "Discover, collect, and sell extraordinary NFTs ",
  subHeading = "Discover the most outstanding NTFs in all topics of life. Creative your NTFs and sell them",
}) => {
  return (

<div className="grid grid-cols-3 grid-rows-2 gap-4">
    <div className="row-span-2">1</div>
    <div >2</div>
    <div className="col-start-2 row-start-2">3</div>
    <div className="row-span-2 col-start-3 row-start-1">4</div>
</div>
    
  )
}
