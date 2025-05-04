export default function Home() {
    const images = [
        { name: 'interior1', alt: 'Interior' },
        { name: 'burger', alt: 'Burger' },
        { name: 'fries', alt: 'Fries' },
        { name: 'exterior', alt: 'Exterior' },
        { name: 'pizza', alt: 'Pizza' },
        { name: 'interior2', alt: 'Interior' }
    ];
  
    return (
        <main className="content">
            <div className="gallery">
            <h2>Gallery</h2>
            <div className="slider">
                <div className="slides">
                {images.map((img) => (
                    <div key={img.name} className="slide">
                    <img src={`/img/${img.name}.webp`} alt={img.alt} />
                    </div>
                ))}
                </div>
            </div>
            </div>
        </main>
    );
  }
  
  