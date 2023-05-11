import style from '@/styles/Testimonial.module.css'
import Image from 'next/image'

const Testimonial = () => {
  return (
    <div className={style.wrapperContainer}>
      <h2>What Our Clients Think</h2>
      <div className={style.wrapper}>
        <div className={style.container}>
          <p className={style.sentence}>
            I was so relieved to find out that HireLeb accepts payment through
            OMT. With the current state of credit card usage in Lebanon, its
            been tough to find reliable payment options. Thanks to HireLeb, I
            can focus on delivering great work without worrying about payment
            issues.
          </p>
          <div className={style.user}>
            <Image
              className={style.image}
              src="/girl1.jpeg"
              width={80}
              height={80}
              alt="Testimonial"
            />
            <div>
              <p>Sarah L.</p>
              <span>Freelancer</span>
            </div>
          </div>
        </div>
        <div className={style.container}>
          <p className={style.sentence}>
            I was hesitant to try out a freelance platform at first, but
            HireLebs payment system through OMT made the whole process much
            easier and more accessible. I was able to find the perfect
            freelancer for my project and I couldnt be happier with the results.
            Highly recommend!
          </p>
          <div className={style.user}>
            <Image
              className={style.image}
              src="/guy2.webp"
              width={80}
              height={80}
              alt="Testimonial"
            />
            <div>
              <p>Tom W.</p>
              <span>Buyer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
